package fieldpromotion

import (
	"encoding/json"
	"net/http"
	"time"
	"sort"
	"strings"

	"appengine"
	"appengine/datastore"
	"appengine/user"
)

type Game struct {
	Date              time.Time      `datastore:"date" json:"date"`
	PlayerFaction     string         `datastore:"player_faction" json:"player_faction"`
	PlayerWarcaster   string         `datastore:"player_warcaster" json:"player_warcaster"`
	OpponentName      string         `datastore:"opponent_name" json:"opponent_name"`
	OpponentFaction   string         `datastore:"opponent_faction" json:"opponent_faction"`
	OpponentWarcaster string         `datastore:"opponent_warcaster" json:"opponent_warcaster"`
	Size              int            `datastore:"size" json:"size"`
	Result            string         `datastore:"result" json:"result"`
	Won               bool           `datastore:"won" json:"won"`
	Draw              bool           `datastore:"draw" json:"draw"`
	Teaching          bool           `datastore:"teaching" json:"teaching"`
	Location          string         `datastore:"location" json:"location"`
	GameType          string         `datastore:"game_type" json:"game_type"`
	Key               *datastore.Key `datastore:"-" json:"key"`
}

type ByDate []Game
func (a ByDate) Len() int           { return len(a) }
func (a ByDate) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a ByDate) Less(i, j int) bool { return !a[i].Date.Before(a[j].Date) }

type User struct {
	Email    string    `datastore:"email"`
	Name     string    `datastore:"name"`
	User_id  string    `datastore:"user_id"`
	Active   time.Time `datastore:"active"`
	Premeium bool      `datastore:"premeium"`
}

type Response struct {
	Games   []Game `json:"games"`
	Wins    int    `json:"win_count"`
	NtCount int    `json:"non_teaching_count"`
}

func handleGet(writer http.ResponseWriter, request *http.Request, namespace appengine.Context) {
	var games []Game
	var wins = 0
	var nts = 0

	query := datastore.NewQuery("Game")
	keys, _ := query.GetAll(namespace, &games)
	sort.Sort(ByDate(games))

	for i, key := range keys {
		games[i].Key = key
		if games[i].Won {
			wins++
		}

		if !games[i].Teaching && !games[i].Draw {
			nts++
		}
	}
	
	resp := Response{Games: games, Wins: wins, NtCount: nts}
	response, _ := json.Marshal(resp)
	writer.Write(response)
}

func handlePost(writer http.ResponseWriter, request *http.Request, namespace appengine.Context) {
	p := make([]byte, request.ContentLength)    
	_, err := request.Body.Read(p)

	if err == nil {
	    var newGame Game
	    err1 := json.Unmarshal(p, &newGame)
	    if err1 == nil {
	        key := datastore.NewKey(namespace, "Game", "", 0, nil)
			datastore.Put(namespace, key, &newGame)
	    } else {
	        namespace.Infof("Unable to unmarshall the JSON request", err1);
	    }
	}
}

func handleDelete(writer http.ResponseWriter, request *http.Request, namespace appengine.Context) {
	keyName := request.URL.Path
	i := strings.Index(keyName, "/")
	keyName = keyName[i+1:]
	i = strings.Index(keyName, "/")
	keyName = keyName[i+1:]
	
	key, err := datastore.DecodeKey(keyName)
	err = datastore.Delete(namespace, key)
	if err != nil {
		namespace.Infof("Yuck", err);
	}
}

func init() {
	http.HandleFunc("/game_go/", handleRequest)
}

func handleRequest(writer http.ResponseWriter, request *http.Request) {
	context := appengine.NewContext(request)
	user := user.Current(context)
	namespaceContext, _ := appengine.Namespace(context, user.ID)

	if request.Method == "GET" {
        handleGet(writer, request, namespaceContext)
    } else if request.Method == "POST" {
        handlePost(writer, request, namespaceContext)
    } else if request.Method == "DELETE" {
        handleDelete(writer, request, namespaceContext)
    }else {
        http.Error(writer, "Invalid request method.", 405)
    }
}

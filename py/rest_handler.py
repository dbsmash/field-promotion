import webapp2
from models import Game
from models import User
from google.appengine.ext import ndb
import logging
import json
from datetime import datetime
from google.appengine.api import users
from google.appengine.api import namespace_manager
from collections import defaultdict
import math
import datetime

class StatsHandler(webapp2.RequestHandler):
    def how_many_months_ago(self, date1, date2):
        delta = abs(date1 - date2)
        months = int(math.ceil(delta.days / 30))
        return months

    def initialize_stats(self):
        return {
            'count': 0,
            'nt_count': 0,
            'wins': 0,
            'win_per': 0.0,
            'history':[0,0,0,0,0,0,0,0,0,0,0,0]
        }

    def get(self):
        today = datetime.date.today()
        statMap = {}
        game_list = []
        namespace_manager.set_namespace(users.get_current_user().user_id())
        query = Game.query()
        games = query.fetch(1000)
        for game in games:
            faction = game.player_faction
            if not faction in statMap:
                statMap[faction] = self.initialize_stats()
            statMap[game.player_faction]['count'] += 1
            if game.won:
                statMap[game.player_faction]['wins'] += 1
            if not game.teaching and not game.draw:
                statMap[game.player_faction]['nt_count'] += 1

            months_ago = self.how_many_months_ago(game.date, today)
            if months_ago < 12:
                statMap[game.player_faction]['history'][months_ago] +=1


        self.response.out.write(json.dumps(statMap))


class GameHandler(webapp2.RequestHandler):

    def record_usage(self):
        cu = users.get_current_user()
        current_user = User.query().filter(User.user_id == cu.user_id()).get()
        if not current_user:
            user = User(user_id = cu.user_id(), name = cu.nickname(), email=cu.email())
            user.put()
        else:
            current_user.put()

    def get(self):
        """
        GET ALL games - and filters if there are search criteria
        """
        self.record_usage()
        game_list = []
        namespace_manager.set_namespace(users.get_current_user().user_id())
        query = Game.query()

        if self.request.get('player_faction'):
            query = query.filter(Game.player_faction == self.request.get('player_faction'))
        if self.request.get('player_warcaster'):
            query = query.filter(Game.player_warcaster == self.request.get('player_warcaster'))
        if self.request.get('opponent_name'):
           query = query.filter(Game.opponent_name == self.request.get('opponent_name'))
        if self.request.get('opponent_faction'):
            query = query.filter(Game.opponent_faction == self.request.get('opponent_faction'))
        if self.request.get('opponent_warcaster'):
            query = query.filter(Game.opponent_warcaster == self.request.get('opponent_warcaster'))
        if self.request.get('size'):
            query = query.filter(Game.size == self.request.get('size'))
        if self.request.get('result'):
            query = query.filter(Game.result == self.request.get('result'))
        if self.request.get('location'):
            query = query.filter(Game.location == self.request.get('location'))
        if self.request.get('game_type'):
            query = query.filter(Game.game_type == self.request.get('game_type'))

        win_count = 0
        non_teaching_count = 0

        games = query.fetch(1000)

        for game in games:
            if game.won:
                win_count = win_count + 1
            if not game.teaching and not game.draw:
                non_teaching_count = non_teaching_count + 1
            game_map = {}
            for attr in ['player_faction', 'player_warcaster', 'opponent_name', 'opponent_faction',
                         'opponent_warcaster', 'result', 'size', 'won', 'draw', 'teaching']:
                game_map[attr] = getattr(game, attr)
            game_map['date'] = game.date.isoformat()
            if game.created_at is not None:
                game_map['created_at'] = game.created_at.isoformat()
            game_map['key'] = game.key.urlsafe()
            game_list.append(game_map)
        game_list.sort(key=lambda game: game['date'], reverse=True)
        results = {
            'games': game_list,
            'win_count': win_count,
            'non_teaching_count': non_teaching_count
        }

        self.response.out.write(json.dumps(results))

    def post(self):
        """
        CREATE a new Game entity 
        """
        self.record_usage()
        namespace_manager.set_namespace(users.get_current_user().user_id())
        param_map = {}
        param_map['player_faction'] = self.request.get('player_faction')
        param_map['player_warcaster'] = self.request.get('player_warcaster')
        param_map['opponent_name'] = self.request.get('opponent_name', '')
        param_map['opponent_faction'] = self.request.get('opponent_faction')
        param_map['opponent_warcaster'] = self.request.get('opponent_warcaster')
        param_map['result'] = self.request.get('result')
        param_map['size'] = int(self.request.get('size', 0))
        param_map['won'] = self.request.get('won') == 'true'
        param_map['draw'] = self.request.get('draw') == 'true'
        param_map['teaching'] = self.request.get('teaching') == 'true'
        param_map['location'] = self.request.get('location', '')
        param_map['game_type'] = self.request.get('game_type', '')
        date = self.request.get('date')
        try:
            real_date = datetime.datetime.strptime(date,'%m/%d/%Y')
        except (ValueError):
            real_date = datetime.datetime.strptime(date,'%Y-%m-%d')
        param_map['date'] = real_date
        param_map['created_at'] = datetime.datetime.now()
        logging.error(param_map)
        game = Game(**param_map)
        game.put()
        self.response.out.write(game.key.urlsafe())

    def put(self):
        """
        UPDATE an existing Game entity
        """
        self.record_usage()
        namespace_manager.set_namespace(users.get_current_user().user_id())
        key_str = self.request.get('key')
        key = ndb.Key(urlsafe=key_str)
        game = key.get()
        if not game:
            self.response.set_code(500)
            return
        if self.request.get('player_faction'):
            game.player_faction = self.request.get('player_faction')
        if self.request.get('player_warcaster'):
            game.player_warcaster = self.request.get('player_warcaster')
        if self.request.get('opponent_name'):
            game.opponent_name = self.request.get('opponent_name')
        if self.request.get('opponent_faction'):
            game.opponent_faction = self.request.get('opponent_faction')
        if self.request.get('opponent_warcaster'):
            game.opponent_warcaster = self.request.get('opponent_warcaster')
        if self.request.get('result'):
            game.result = self.request.get('result')
        if self.request.get('size'):
            game.size = int(self.request.get('size', 0))
        if self.request.get('won'):
            game.won = bool(self.request.get('won'))
        if self.request.get('draw'):
            game.draw = bool(self.request.get('draw'))
        if self.request.get('teaching'):
            game.teaching = bool(self.request.get('teaching'))
        if self.request.get('date'):
            date = self.request.get('date')
            try:
                real_date = datetime.datetime.strptime(date,'%m/%d/%Y')
            except (ValueError):
                real_date = datetime.datetime.strptime(date,'%Y-%m-%d')
            game.date = real_date
        game.put()

    def delete(self):
        """
        DELETE an existing Game entity
        """
        self.record_usage()
        namespace_manager.set_namespace(users.get_current_user().user_id())
        key_str = self.request.url
        key_str = self.request.url[self.request.url.rfind('/')+1:]
        key = ndb.Key(urlsafe=key_str)
        key.delete()

app = webapp2.WSGIApplication([
    ('/game.*', GameHandler),
    ('/stat.*', StatsHandler)
], debug=True)

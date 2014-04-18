import webapp2
from models import Game
from google.appengine.ext import ndb
import logging
import json
from datetime import datetime
from google.appengine.api import users
from google.appengine.api import namespace_manager

class GameHandler(webapp2.RequestHandler):
    def get(self):
    	"""
    	GET ALL games
    	"""
    	game_list = []
    	namespace_manager.set_namespace(users.get_current_user().user_id())
    	games = Game.query().order(-Game.date).fetch(1000)
    	for game in games:
    		game_map = {}
    		game_map['player_faction'] = game.player_faction
	    	game_map['player_warcaster'] = game.player_warcaster
	    	game_map['opponent_name'] = game.opponent_name
	    	game_map['opponent_faction'] = game.opponent_faction
	    	game_map['opponent_warcaster'] = game.opponent_warcaster
	    	game_map['result'] = game.result
	    	game_map['size'] = game.size
	    	game_map['won'] = game.won
	    	game_map['draw'] = game.draw
	    	game_map['teaching'] = game.teaching
	    	game_map['date'] = str(game.date)
	    	game_map['key'] = game.key.urlsafe()
    		game_list.append(game_map)
    	self.response.out.write(json.dumps(game_list))

    def post(self):
    	"""
    	CREATE a new Game entity 
    	"""
        logging.error(self.request)
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
    	date = self.request.get('date')
    	try:
            real_date = datetime.strptime(date,'%m/%d/%Y')
        except (ValueError):
            real_date = datetime.strptime(date,'%Y-%m-%d')
        param_map['date'] = real_date
        logging.error(param_map)
        game = Game(**param_map)
        game.put()
        self.response.out.write(game.key.urlsafe())

    def put(self):
    	"""
    	UPDATE an existing Game entity
    	"""
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
	            real_date = datetime.strptime(date,'%m/%d/%Y')
	        except (ValueError):
	            real_date = datetime.strptime(date,'%Y-%m-%d')
	        game.date = real_date
		game.put()

    def delete(self):
    	"""
    	DELETE an existing Game entity
    	"""
    	namespace_manager.set_namespace(users.get_current_user().user_id())
    	key_str = self.request.url
    	key_str = self.request.url[self.request.url.rfind('/')+1:]
    	key = ndb.Key(urlsafe=key_str)
    	key.delete()

app = webapp2.WSGIApplication([
    ('/game.*', GameHandler)
], debug=True)
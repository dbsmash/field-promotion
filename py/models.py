from google.appengine.ext import ndb
from google.appengine.api import memcache

class Game(ndb.Model):
	date = ndb.DateProperty(required=True)
	player_faction = ndb.StringProperty(required=True)
	player_warcaster = ndb.StringProperty(required=True)
	opponent_name = ndb.StringProperty()
	opponent_faction = ndb.StringProperty(required=True)
	opponent_warcaster = ndb.StringProperty(required=True)
	size = ndb.IntegerProperty()
	result = ndb.StringProperty(required=True)
	won = ndb.BooleanProperty()
	draw = ndb.BooleanProperty()
	teaching = ndb.BooleanProperty()
	location = ndb.StringProperty()
	game_type = ndb.StringProperty()


class User(ndb.Model):
	email = ndb.StringProperty()
	name = ndb.StringProperty()
	user_id = ndb.StringProperty()
	active = ndb.DateTimeProperty(auto_now=True)
	premeium = ndb.BooleanProperty(default=False)
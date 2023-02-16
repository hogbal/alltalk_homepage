import os
import configparser
from flask import Flask
from models import init_db
from flask_cors import CORS

from blueprint import signin, signup, main, story, write, util, my

config = configparser.ConfigParser()
config.read('/usr/src/app/config.ini')
user = config['MariaDB']['user']
password = config['MariaDB']['password']
port = int(config['MariaDB']['port'])

db = {
    'user':user,
    'password':password,
    'host':'mariadb',
    'port':port,
    'database':'alltalk_db'
}

app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False
app.secret_key = os.urandom(32)

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+mysqlconnector://{db['user']}:{db['password']}@{db['host']}:{db['port']}/{db['database']}?charset=utf8mb4&collation=utf8mb4_general_ci"

db = init_db(app)

app.register_blueprint(signin.blue_signin)
app.register_blueprint(signup.blue_signup)
app.register_blueprint(main.blue_main)
app.register_blueprint(story.blue_story)
app.register_blueprint(write.blue_write)
app.register_blueprint(util.blue_util)
app.register_blueprint(my.blue_my)

app.run(host="0.0.0.0", port=5000)

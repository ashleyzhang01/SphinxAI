from flask import Flask
from flask_cors import CORS
import os

app = Flask(__name__)

CORS(app)

db_path = os.path.join(os.path.dirname(__file__), 'interview.db')
print(db_path)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///{}'.format(db_path)

from interview.users.routes import users

app.register_blueprint(users)

from interview.behavioral.routes import behavioral

app.register_blueprint(behavioral)

from interview.technical.routes import technical

app.register_blueprint(technical)

from interview.interviewerVideo.routes import interviewerVideo

app.register_blueprint(interviewerVideo)


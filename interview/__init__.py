from flask import Flask
import os

app = Flask(__name__)

db_path = os.path.join(os.path.dirname(__file__), 'interview.db')
print(db_path)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///{}'.format(db_path)

from interview.users.routes import users

app.register_blueprint(users)
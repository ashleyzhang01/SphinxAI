from flask_sqlalchemy import SQLAlchemy
from enum import Enum
from interview import app

db = SQLAlchemy(app)
    
class User(db.Model):
    '''User model'''
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    def to_json(self):
        return {
            'id': self.id,
            'username': self.username
        }
    def __repr__(self):
        return f"<User {self.username}, id {self.id}, password {self.password}>"
    

class CategoryEnum(Enum):
    GENERAL = 'general'
    # QUANT = 'quant'
    CONSULTING = 'consulting'
    IB = 'investment_banking'
    
class Question(db.Model):
    '''Question model'''
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.Enum(CategoryEnum), nullable=False)
    question = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"<Category {self.category}, Question {self.question}>"

#from .bootstrap import load_clubs, load_users, test_comments, load_scraped_clubs
from interview.questions import import_questions

with app.app_context():
   db.drop_all()
   db.create_all()
    #load_clubs()
    #load_scraped_clubs()
   # load_users()
    #test_comments()

# Your database models should go here.
# Check out the Flask-SQLAlchemy quickstart for some good docs!
# https://flask-sqlalchemy.palletsprojects.com/en/2.x/quickstart/
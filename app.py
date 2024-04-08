import streamlit as st
from interview import app
from interview.models import Question
import requests

@app.route("/")
def index():
    question_samples = {
          "general": Question.query.filter_by(category='general').first(),
          "general_count": Question.query.filter_by(category='general').count(),
          "investment_banking": Question.query.filter_by(category='investment_banking').first(),
          "banking_count": Question.query.filter_by(category='investment_banking').count(),
          "consulting": Question.query.filter_by(category='consulting').first(),
          "consulting_count": Question.query.filter_by(category='consulting').count(),
    }
    return question_samples  # Just a simple response for demonstration

if __name__ == '__main__':
        app.run(debug=True)
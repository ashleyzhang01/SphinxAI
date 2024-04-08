import streamlit as st
from interview import app
from interview.models import Question
import requests

@app.route("/")
def index():
    question_samples = {
          "general": Question.query.filter_by(category='GENERAL').first().question,
          "general_count": Question.query.filter_by(category='GENERAL').count(),
          "investment_banking": Question.query.filter_by(category='IB').first().question,
          "banking_count": Question.query.filter_by(category='IB').count(),
          "consulting": Question.query.filter_by(category='CONSULTING').first().question,
          "consulting_count": Question.query.filter_by(category='CONSULTING').count(),
    }
    return question_samples  # Just a simple response for demonstration

if __name__ == '__main__':
        app.run(debug=True)
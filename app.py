import streamlit as st
from interview import app
from interview.models import Question, CodingTechnical
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
    coding_q1 = CodingTechnical.query.filter_by(language='PYTHON').first()
    coding_sample = {
        "id": coding_q1.id,
        "name": coding_q1.name.replace('\\n', '\n'),
        "description": coding_q1.description.replace('\\n', '\n'),
        "solution": coding_q1.solution.replace('\\n', '\n'),
        "tests": coding_q1.tests.replace('\\n', '\n'),
    }
    return coding_sample  # Just a simple response for demonstration

if __name__ == '__main__':
        app.run(debug=True)
from flask import Blueprint, flash, request, redirect, jsonify
import requests
from werkzeug.utils import secure_filename
from sqlalchemy.sql.expression import func
from dotenv import load_dotenv
import os
import json
import base64
from interview.models import db, CodingTechnical, Question, Feedback, User
from interview import ai

feedback = Blueprint('feedback', __name__)

load_dotenv()

@feedback.route('/api/feedback/dummy', methods=['GET'])
def dummy_feedback():
    return jsonify({
        "feedback": [
            {
                "id": 1,
                "user_id": 1,
                "behavioral_feedback": "Good",
                "technical_feedback": "Good",
                "category": "SWE"
            },
            {
                "id": 2,
                "user_id": 1,
                "behavioral_feedback": "Good",
                "technical_feedback": "Good",
                "category": "QUANT"
            }
        ]
    })

@feedback.route('/api/feedback', methods=['GET'])
def get_all_user_feedback():
    if request.method == 'GET':
        # get all feedack under the user based on their user_id
        user_id = request.args.get('user_id')
        feedback = db.session.query(Feedback).filter(
            Feedback.user_id == user_id
        ).all()
        return jsonify({
            "feedback": [feedback.to_json() for feedback in feedback]
        })



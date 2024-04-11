from flask import Blueprint, flash, request, redirect, jsonify
import requests
from werkzeug.utils import secure_filename
from sqlalchemy.sql.expression import func
from dotenv import load_dotenv
import os
import json
import base64
from interview.models import db, CodingTechnical, Question


load_dotenv()
RAPIDAPI_KEY = os.environ.get("RAPIDAPI_KEY")

technical = Blueprint('technical', __name__)

@technical.route('/api/technical', methods=['GET', 'POST'])
def generate_technical():
    if request.method == 'POST':
        data = request.get_json()
        category = data.get('category')
        # if they select coding then they need to also select language
        if 'coding' in category or 'software engineering' in category:
            language = data.get('language')
            if not language:
                return jsonify({'error': 'No language selected'}), 400
            coding_techical = db.session.query(CodingTechnical).filter(
                CodingTechnical.language == language.upper()
            ).order_by(func.random()).first()
            return jsonify({
                "name": coding_techical.name.replace('\\n', '\n'),
                "language": language.upper(),
                "description": coding_techical.description.replace('\\n', '\n').replace('\\"', '\"'),
                "starter_code": coding_techical.starter_code.replace('\\n', '\n').replace('\\"', '\"')
            })
        elif 'banking' in category.lower(): # might not need depending on what it's called
            category = "IB"
        # returns 3 random technical questions based on category
        technicals = db.session.query(Question).filter(
            Question.category == category
        ).order_by(func.random()).limit(3).all()
        return jsonify({
            "question": [question.question for question in technicals]
        })


# this post should include id of the technical so that we can get the right tests
# should be called anytime the user wants to run tests or submit. submit in JSON format
@technical.route('/api/technical/submit', methods=['GET', 'POST'])
def submit_technical():
    if request.method == 'POST':
        data = request.get_json()
        problem_name = data.get('problem_name')
        problem_language = data.get('problem_language')
        user_code = data.get('user_code')
        
        problem = db.session.query(CodingTechnical).filter(
            CodingTechnical.name == problem_name).filter(
                CodingTechnical.language == problem_language.upper()
            ).first()
        if not problem:
            return jsonify({'error': 'Problem not found'}), 404
        print(problem)
        execution_code = ""
        language_id = get_language_id(problem_language)
        print(language_id)
        if language_id == None:
            return jsonify({'error': 'No language selected.'})
        elif language_id == 71:
            execution_code += "from copy import deepcopy\nfrom typing import List, Set\n\n"
        elif language_id == 62:
            execution_code += "import java.util.*;\n\n"
        
        execution_code += user_code + '\n\n' + problem.tests
        execution_code = execution_code.replace('\\n', '\n').replace('\\"', '\"')
        print(execution_code)
        execution_code =  base64.b64encode(execution_code.encode()).decode('utf-8')
        
        result = submit_to_judge0(execution_code, language_id)
        print(result['stdout'])
        return jsonify({
            'test_results': base64.b64decode(result['stdout']).decode('utf-8').strip(),
            'runtime': result['time']
            })


def get_language_id(language_enum):
    # maps your CodingLanguageEnum to Judge0 language IDs
    # add to this mapping based on included languages and Judge0's language IDs
    return {
        'python': 71,
        'java': 62,
    }.get(language_enum.name.lower(), None)

def submit_to_judge0(source_code, language_id):
    url = "https://judge0-ce.p.rapidapi.com/submissions"

    querystring = {"base64_encoded":"true", "wait":"true", "fields":"*"}
    print(source_code)
    payload = {
        'source_code': source_code,
        'language_id': language_id,
        'stdin': 'SnVkZ2Uw'
    }
    headers = {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
    }
    response = requests.post(url, json=payload, headers=headers, params=querystring)
    print(response)
    if response.status_code == 200:
        return response.json()
    else:
        return {'error': 'Failed to submit to Judge0'}
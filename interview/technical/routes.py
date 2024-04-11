from flask import Blueprint, flash, request, redirect, jsonify
import requests
from werkzeug.utils import secure_filename
from sqlalchemy.sql.expression import func
from dotenv import load_dotenv
import os
import json
import base64
from interview.models import db, CodingTechnical, Question
from interview import ai


load_dotenv()
RAPIDAPI_KEY = os.environ.get("RAPIDAPI_KEY")

technical = Blueprint('technical', __name__)

@technical.route('/api/technical', methods=['GET', 'POST'])
def generate_technical():
    if request.method == 'POST':
        data = request.get_json()
        category = data.get('category')
        num = 3
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
        elif 'quant' in category.lower():
            num = 6
        # returns 3 random technical questions based on category
        technicals = db.session.query(Question).filter(
            Question.category == category.upper()
        ).order_by(func.random()).limit(num).all()
        return jsonify({
            "question": [question.question for question in technicals]
        })

@technical.route('/api/technical/feedback', methods=['GET', 'POST'])
# request should contain the question(s), category, and transcript. if coding technical, technical name, language, runtime, test_results.
def feedback():
    if request.method == 'POST':
        data = request.json 
        
        question = data.get('question')
        category = data.get('category')
        transcript = data.get('transcript', '')

        if 'coding' in category or 'software engineering' in category:
            language = data.get('language')
            if not language:
                return jsonify({'error': 'No language selected'}), 400
            question = db.session.query(CodingTechnical).filter(
                CodingTechnical.name == question
            ).filter(
                CodingTechnical.language == language
            ).first()
            transcript_feedback = ai.process_transcript_section('coding', transcript)
            feedback_response = {
                'Feedback': f'{data.get('test_results')}\nRuntime: {data.get('runtime')}\n' + transcript_feedback,
                'Question Description': question.description,
                'Sample Solution': question.solution
            }
            return jsonify(feedback_response)
        
        if category.lower() == 'quant':
            has_answers = False
            for q in question:
                q = db.session.query(Question).filter(Question.question == q).first()
                if q and q.answer and not has_answers:
                    has_answers = True
                    transcript += '\nThe transcript has now ended. Some questions have clear answers. Compare the interviewee response to the correct answers for those questions below, and tell them if they are wrong.'
                elif q and q.answer and has_answers:
                    transcript += f'\nThe correct answer to the question {q.question} is {q.answer}.'

        transcript_feedback = ai.process_transcript_section(category.lower(), transcript)
        feedback_response = {
            'Feedback': transcript_feedback,
            'Questions': question
        }
        return jsonify(feedback_response)

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
        if result['stdout']:
            print(result['stdout'])
            return jsonify({
                'question': problem_name,
                'language': problem_language,
                'test_results': base64.b64decode(result['stdout']).decode('utf-8').strip(),
                'runtime': result['time']
            })
        else:
            return jsonify({
                'output': base64.b64decode(result['compile_output']).decode('utf-8').strip()
            })


def get_language_id(language_enum):
    # maps your CodingLanguageEnum to Judge0 language IDs
    # add to this mapping based on included languages and Judge0's language IDs
    return {
        'python': 71,
        'java': 62,
    }.get(language_enum.lower(), None)

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
from flask import Blueprint, flash, request, redirect, jsonify
import requests
from werkzeug.utils import secure_filename
from sqlalchemy.sql.expression import func
from dotenv import load_dotenv
import os
import base64
from interview.models import db, CodingTechnical


load_dotenv()
RAPIDAPI_KEY = os.environ.get("RAPIDAPI_KEY")

technical = Blueprint('technical', __name__)

# this post should include id of the technical so that we can get the right tests
# should be called anytime the user wants to run tests or submit. submit in JSON format
@technical.route('/api/technical/submit', methods=['GET', 'POST'])
def submit_technical():
    if request.method == 'POST':
        data = request.get_json()
        problem_id = data.get('problem_id')
        user_code = data.get('user_code')
        
        # problem = CodingTechnical.query.get(problem_id)
        # if not problem:
        #     return jsonify({'error': 'Problem not found'}), 404
        
        # execution_code = ""
        # language_id = get_language_id(problem.language)

        # if language_id == 71:
        #     execution_code += "from copy import deepcopy\nfrom typing import List, Set\n\n"
        # elif language_id == 62:
        #     execution_code += "import java.util.*;\n\n"
        
        # execution_code += user_code + '\n\n' + problem.tests
        execution_code = "import java.util.*;\n" # remove
        execution_code += user_code + '\n\n'
        execution_code += "\nclass Main {\n    public static void main(String[] args) {\n        Solution solution = new Solution();\n    \n        int n1 = 3;\n        int[][] edges1 = {{0, 1}, {0, 2}, {1, 2}};\n        long expected1 = 0;\n        long actual1 = solution.countPairs(n1, edges1);\n        if (actual1 != expected1) {\n            System.out.println(\"Test failed: Expected \" + expected1 + \", but got \" + actual1 + \".\");\n        }\n    \n        int n2 = 7;\n        int[][] edges2 = {{0, 2}, {0, 5}, {2, 4}, {1, 6}, {5, 4}};\n        long expected2 = 14;\n        long actual2 = solution.countPairs(n2, edges2);\n        if (actual2 != expected2) {\n            System.out.println(\"Example failed: Expected \" + expected2 + \", but got \" + actual2 + \".\");\n        }\n        if (actual1 == expected1 && actual2 == expected2) {\n            System.out.println(\"All tests passed\");\n        }\n    }\n}"
        execution_code =  base64.b64encode(execution_code.encode()).decode('utf-8')
        print(execution_code)
        language_id = 62 # remove
        result = submit_to_judge0(execution_code, language_id)
        print(result['stdout'])
        return jsonify({'test_results': base64.b64decode(result['stdout']).decode('utf-8').strip()})


def get_language_id(language_enum):
    # maps your CodingLanguageEnum to Judge0 language IDs
    # add to this mapping based on included languages and Judge0's language IDs
    return {
        'python': 71,
    }.get(language_enum.name.lower(), None)

def submit_to_judge0(source_code, language_id):
    url = "https://judge0-ce.p.rapidapi.com/submissions"

    querystring = {"base64_encoded":"true","wait":"true","fields":"*"}
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
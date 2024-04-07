from openai import OpenAI
import os
from flask import Blueprint, flash, request, redirect, url_for, jsonify
from werkzeug.utils import secure_filename
from sqlalchemy.sql.expression import func
from interview.models import db, Question

from interview.behavioral import ai

behavioral = Blueprint('behavioral', __name__)

UPLOAD_FOLDER = './static/uploads'


# (multipart form) A <form> tag is marked with enctype=multipart/form-data and an <input type=file> is placed in that form.
# The application accesses the file from the files dictionary on the request object.
# use the save() method of the file to save the file permanently somewhere on the filesystem.
# Should have the resume along with other information for the 
@behavioral.route('/api/behavioral', methods=['GET', 'POST'])
def generate_behavioral():
    if request.method == 'POST':
        # persona / introduction
        behavioral_qs = db.session.query(Question).filter(Question.category == 'BEHAVIORAL').order_by(func.random()).limit(3).all()
        resume_qs = ['Walk me through your resume and tell me about your experiences.']
        if 'file' not in request.files:
            flash('No file part')
        file = request.files['file']
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file:
            filename = secure_filename(file.filename)
            file.save(f'static/resumes/{filename}')
            resume_qs = ai.resume_grill(f'./static/resumes/{filename}')
        
        questions_list = {
            # 'intro': ...,
            'behavioral': [question.question for question in behavioral_qs],
            'resume': resume_qs,
            'questions': ['Do you have any questions for me?']
        }
        return jsonify(questions_list)



@behavioral.route('/api/behavioral/feedback', methods=['GET', 'POST'])
# transcript should be a JSON dict of the 3 different parts
def feedback(transcript):
    if request.method == 'POST':
        transcript = request.json 
        
        about = transcript.get('about', '')
        resume = transcript.get('resume', '')
        questions = transcript.get('questions', '')

        about_feedback = ai.process_transcript_section('about', about)
        resume_feedback = ai.process_transcript_section('resume', resume)
        questions_feedback = ai.process_transcript_section('questions', questions)

        feedback_response = {
            'about_feedback': about_feedback,
            'resume_feedback': resume_feedback,
            'questions_feedback': questions_feedback
        }

        return jsonify(feedback_response)

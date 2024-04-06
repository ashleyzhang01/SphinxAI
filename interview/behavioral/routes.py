from openai import OpenAI
import os
from flask import Blueprint, flash, request, redirect, url_for, jsonify
from werkzeug.utils import secure_filename

from interview.behavioral import ai, process_transcript_section

behavioral = Blueprint('behavioral', __name__)

UPLOAD_FOLDER = 'static/uploads'

# A <form> tag is marked with enctype=multipart/form-data and an <input type=file> is placed in that form.
# The application accesses the file from the files dictionary on the request object.
# use the save() method of the file to save the file permanently somewhere on the filesystem.
@behavioral.route('/resume-upload', methods=['GET', 'POST'])
def resume_upload():
    if request.method == 'POST':
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file:
            filename = secure_filename(file.filename)
            file.save(f'static/{filename}')
            resume_questions = ai.resume_grill(f'static/{filename}')


@behavioral.route('/behavioral-feedback', methods=['GET', 'POST'])
# transcript should be a JSON dict of the 3 different parts
def feedback(transcript):
    if request.method == 'POST':
        transcript = request.json 
        
        about = transcript.get('about', '')
        resume = transcript.get('resume', '')
        questions = transcript.get('questions', '')

        about_feedback = process_transcript_section('about', about)
        resume_feedback = process_transcript_section('resume', resume)
        questions_feedback = process_transcript_section('questions', questions)

        feedback_response = {
            'about_feedback': about_feedback,
            'resume_feedback': resume_feedback,
            'questions_feedback': questions_feedback
        }

        return jsonify(feedback_response)

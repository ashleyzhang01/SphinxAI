from openai import OpenAI
from dotenv import load_dotenv
import os
# import cv2
# import mediapipe as mp
import numpy as np

load_dotenv()
API_KEY = os.environ.get("OPENAI_API_KEY")

def resume_grill(resume):
    client = OpenAI(api_key=API_KEY)
    file = client.files.create(file=open(resume, "rb"), purpose="fine-tune")
    client = OpenAI(api_key=API_KEY)
    completion = client.chat.completions.create(
        model="gpt-4-1106",
        messages=[{"role": "system",
                   "content": "You are a helpful assistant for the interview process. You can read resumes " +
                              "and come up with questions to grill applicants about their resume/experience."},
                  {"role": "user",
                   "content": "Read the following resume and come up with a list of 2-4 questions. " +
                              f"Separate each question with a new line. {file.id}"}])
    response = completion.choices[0].message.content
    return '\n'.split(response)

section_dict = {
    'about': 'This is the about/introduction section of a behavioral interview, where the interviewer asks questions to get to know the applicant more.',
    'resume': 'This is the resume section of a behavioral interview, where the interview asks about the experience of the interviewee, or the interviewee will walk the interviewer through their resume.',
    'questions': 'This is the questions section of a behavioral interview, where the interviewee asks the interviewer questions. Provide suggestions of better questions they could possibly ask.'
}

def process_transcript_section(section, eyetrack_score, transcript):
    """Generates feedback for a given section of the transcript."""
    client = OpenAI(api_key=API_KEY)
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant analyzing an interview transcript. " +
             "Provide detailed feedback, suggestions for improvement, and note any use of filler words or poor sentence flow. Be concise but thorough, don't repeat information. " + 
             + section_dict.get(section)
            #  + f"Also take in the audio score, which measures how well the user confidently spoke, which here is {audio_score}. we want this to be higher approaching 1." //to be implemented when tts and stt implemented
             + f", and the video score, which detects how confidently the user speaks, which here is {eyetrack_score}, we want this to be higher." 
            },
            {"role": "user", "content": f'Here is the transcript of the {section} section of a behavioral interview: {transcript}'}
        ]
    )
    return completion.choices[0].message.content

def ask_followup(intervieweeResponse, question):
    """Generates responses given an interviewees response to a question."""
    client = OpenAI(api_key=API_KEY)
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that asks follow up questions to an interviewees response."},
            {"role": "user", "content": f'Here is the interviewee\'s response: {intervieweeResponse}, to this question: {question}'}
        ]
    )
    return completion.choices[0].message.content

# def determine_eyetracking_score(userImage):
#     """Determines eyetracking_socre using how well an image of the user is looking directly at the camera. Goal is to sample images at different
#     intervals then average these scores to get an overall user eyetracking score"""
#     mp_face_mesh = mp.solutions.face_mesh
#     face_mesh = mp_face_mesh.FaceMesh(static_image_mode=True, max_num_faces=1, refine_landmarks=True)

#     image = cv2.imread(userImage)
#     height, width, _ = image.shape
#     image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB) # BGR -> RGB
#     results = face_mesh.process(image_rgb) # detect eyes
#     if not results.multi_face_landmarks or (len(results.multi_face_landmarks) > 1):
#         return 0  

#     #should be 1 result, if multiple ignore
#     face_landmarks = results.multi_face_landmarks[0]
#     #eye dist from center
#     left_eye = face_landmarks.landmark[468]
#     right_eye = face_landmarks.landmark[473] 
#     eye_center_x = (left_eye.x + right_eye.x) / 2 * width
#     eye_center_y = (left_eye.y + right_eye.y) / 2 * height
#     center_x, center_y = width / 2, height / 2
#     distance = np.sqrt((center_x - eye_center_x) ** 2 + (center_y - eye_center_y) ** 2)
#     #convert dist to score
#     max_distance = np.sqrt((width / 2) ** 2 + (height / 2) ** 2)
#     score = max(0, 10 - (distance / max_distance) * 10)

#     return int(score)
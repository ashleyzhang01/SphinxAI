from openai import OpenAI
from dotenv import load_dotenv
import os

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

def process_transcript_section(section, transcript):
    """Generates feedback for a given section of the transcript."""
    client = OpenAI(api_key=API_KEY)
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant analyzing an interview transcript. " +
             "Provide detailed feedback, suggestions for improvement, and note any use of filler words or poor sentence flow. Be concise but thorough, don't repeat information. " + section_dict.get(section)},
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
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
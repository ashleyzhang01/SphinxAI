from openai import OpenAI
import streamlit as st
import requests


st.title("Welcome to your interviewer!")

client = OpenAI(api_key=st.secrets["OPENAI_API_KEY"])

interview_type = st.radio("Select interview type:", ("Consulting", "Banking", "Pure Behavioral"))
if interview_type:
    st.session_state["interview_type"] = interview_type
    resume_uploaded = st.file_uploader("Upload your resume")
    if resume_uploaded:
        # Process the uploaded resume here
        # For example, you can read the contents of the resume using resume_uploaded.read()
        # Add your code to process the uploaded resume
        # Example: Print the resume contents
        resume_contents = resume_uploaded.read()

data = requests.get("http://127.0.0.1:5000/api/questionSet/{}".format(interview_type)).json()

if "openai_model" not in st.session_state:
    st.session_state["openai_model"] = "gpt-3.5-turbo"

if "messages" not in st.session_state:
    st.session_state.messages = []

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

if not st.session_state.messages:
    bot_message = "Hello, welcome to your {} interview! I'm here to help you prepare. Let's get started. First, just walk me through your resume.".format(interview_type)
    st.session_state.messages.append({"role": "assistant", "content": bot_message})
    with st.chat_message("assistant"):
        st.markdown(bot_message)

if prompt := st.chat_input("Type your responses here..."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        stream = client.chat.completions.create(
            model=st.session_state["openai_model"],
            messages=[
                {"role": m["role"], "content": m["content"]}
                for m in st.session_state.messages
            ],
            stream=True,
        )
        response = st.write_stream(stream)
    st.session_state.messages.append({"role": "assistant", "content": response})
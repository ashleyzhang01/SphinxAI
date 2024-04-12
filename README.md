## About
SphinxAI provides an immersive interview experience in one platform.

**Comprehensive Interview Simulation**
We simulate interview processes for a variety of roles, including software engineering, quantitative trading, consulting, and investment banking. We offer both behavioral and technical interviews, which include coding interviews for SWE, case questions for consulting, quantitative/probability questions for quant, etc.

**Full Immersive Interview Experience**
We provide a full immersive interview experience, with text-to-speech and speech-to-text capabilities, along with a customizable mock interviewer, which uses AI to generate follow up responses/questions. It looks amd feels like you are conversing with a real interviewer!

**Personalized AI Analysis & Training**
We use AI to provide personalized feedback and analysis on your responses&apos correctness and clarity, helping you optimize your performance. You'll also get feedback on how to make your points more clear and confident with analysis of eye-tracking, pauses, and filler words.

## Our Tech Stack
![SphinxAI tech stack](https://i.imgur.com/2YYDpH1.png)

## Installation
First, download the dependencies in the Pipfile.
If you do not have Python 3.11, you will need to change the Python version in the Pipfile.
There are many dependencies that were installed in addition to the ones given in the original repo.

`pipenv run pip freeze > requirements.txt` (On linux you will need to do pip3)

Then install the dependencies.

`pipenv install -r requirements.txt`

To run the server in the venv:

`pipenv run flask run`

Create a `.env` file to store the OpenAI API Key with `OPENAI_API_KEY=...`
Do not upload this to the repository. This has already been added to the `.gitignore`.

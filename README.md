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
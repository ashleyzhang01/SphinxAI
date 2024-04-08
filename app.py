import streamlit as st
from interview import app
import requests

@app.route("/")
def index():
    return "Hello, World!"  # Just a simple response for demonstration

if __name__ == '__main__':
        app.run(debug=True)
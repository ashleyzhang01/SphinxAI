import os
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
import requests
import json
from time import sleep

interviewerVideo = Blueprint('interviewerVideo', __name__)

@interviewerVideo.route('/api/interviewer-video', methods=['POST'])
def generate_video():
    """Takes image URL and audio file, returns lip-synced video of interviewer"""
    data = request.json 
    image_url = data.get('image_url')
    if 'audio' not in request.files or not image_url:
        return jsonify({'error': 'Image URL or audio file missing'}), 400
    
    audio_file = request.files['audio']
    audio_filename = secure_filename(audio_file.filename)
    audio_path = os.path.join(current_app.config['UPLOAD_FOLDER'], audio_filename)
    audio_file.save(audio_path)

    gooey_api_key = os.getenv("GOOEY_API_KEY")
    if gooey_api_key is None:
        return jsonify({'error': 'Gooey API key is not set'}), 500

    image_response = requests.get(image_url, stream=True)
    if image_response.status_code != 200:
        return jsonify({'error': 'Failed to fetch image from URL'}), 500

    with open(audio_path, "rb") as audio_file:
        files = {
            "input_face": ("image.jpg", image_response.raw, image_response.headers['Content-Type']),
            "input_audio": audio_file,
        }
        payload = {
            "face_padding_top": 0,
            "face_padding_bottom": 18,
            "face_padding_left": 0,
            "face_padding_right": 0,
        }

        response = requests.post(
            "https://api.gooey.ai/v3/Lipsync/async/form/",
            headers={"Authorization": "Bearer " + gooey_api_key},
            files=files,
            data={"json": json.dumps(payload)},
        )

    os.remove(audio_path)
    
    if not response.ok:
        return jsonify({'error': 'Failed to process video'}), 500
    
    status_url = response.headers["Location"]
    while True:
        response = requests.get(status_url, headers={"Authorization": "Bearer " + gooey_api_key})
        if not response.ok:
            return jsonify({'error': 'Failed to get video status'}), 500
        result = response.json()
        if result["status"] == "completed":
            return jsonify({'video_url': result["output"]["output_video"]}), 200
        elif result["status"] == "failed":
            return jsonify({'error': 'Video processing failed'}), 500
        else:
            sleep(3)

"""for Daniel (or any frontend person), this is result, I'm returning direct link:
{
  "run_id": "p66bv90spzlh",
  "web_url": "https://gooey.ai/Lipsync/?run_id=p66bv90spzlh&uid=FT4FNMViOcNgeiOEC72HbWo33rr1",
  "created_at": "2024-01-19T21:48:08.257954+00:00",
  "run_time_sec": 7.112906,
  "status": "completed",
  "output": {
    "output_video": "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/6f019f2a-b714-11ee-82f3-02420a000172/gooey.ai%20lipsync.mp4"
  }
}
"""
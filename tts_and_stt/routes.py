from flask import Flask, request, jsonify, send_file
from google.cloud import speech, texttospeech
import io
from google.cloud import texttospeech

app = Flask(__name__)

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
   
    # Instantiates a client
    client = speech.SpeechClient()


    # Loads the audio into memory
    audio_content = file.read()
    audio = speech.RecognitionAudio(content=audio_content)
   
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code='en-US',
    )


    # Detects speech in the audio file
    response = client.recognize(config=config, audio=audio)
   
    # Collecting transcription results
    transcriptions = [result.alternatives[0].transcript for result in response.results]
    return jsonify({'transcriptions': transcriptions})


@app.route('/synthesize', methods=['POST'])
def synthesize_text():
    # Expecting text input in the request body
    data = request.json
    if not data or 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400


    text = data['text']
    tts_client = texttospeech.TextToSpeechClient()
    synthesis_input = texttospeech.SynthesisInput(text=text)


    # Build the voice request
    voice = texttospeech.VoiceSelectionParams(language_code='en-US', ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL)
    # Select the audio configuration
    audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3)
    # Perform the text-to-speech request
    response = tts_client.synthesize_speech(input=synthesis_input, voice=voice, audio_config=audio_config)


    # Save the audio to a file in a temporary directory
    output_file_path = "/tmp/output.mp3"
    with open(output_file_path, "wb") as out:
        out.write(response.audio_content)
   
    return send_file(output_file_path, as_attachment=True, mimetype='audio/mp3', download_name='synthesized_speech.mp3')


if __name__ == '__main__':
    app.run(debug=True)


"""
need to set GOOGLE APPLICATION CREDENTIALS as the path to your google cloud credentials file
"""
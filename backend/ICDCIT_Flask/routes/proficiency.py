from flask import request, jsonify
from __main__ import app
from utils.proficiency_model import get_answer_from_model


@app.route('/proficiency', methods=['POST'])
def proficiency():
    data = request.json
    message = data.get('message')
    if not message:
        return jsonify({'error': 'message are required'}), 400

    answer = get_answer_from_model(message)
    return jsonify({'message': answer})

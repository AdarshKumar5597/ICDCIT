from flask import request, jsonify
from __main__ import app
from utils.database_queries import update_chatbot_room, update_room_title
from utils.question_answer_model import get_answer_from_model


@app.route('/question-answer', methods=['POST'])
def question_answer():
    data = request.json
    message = data.get('message')
    messageType = "Incoming"
    chatBotRoomId = data.get('chatBotRoomId')

    if not message or not messageType or not chatBotRoomId:
        return jsonify({'error': 'message, messageType, and chatBotRoomId are required'}), 400

    update_chatbot_room(chatBotRoomId, message, messageType)
    update_room_title(chatBotRoomId)

    answer = get_answer_from_model(message)
    update_chatbot_room(chatBotRoomId, answer, "Outgoing")
    return jsonify({'messageType': "Incoming", 'message': answer, 'chatBotRoomId': chatBotRoomId})

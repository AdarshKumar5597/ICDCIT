from flask import request, jsonify
from flask_socketio import SocketIO, join_room, leave_room, emit
import uuid
from __main__ import app, socketio

# from app import process_command
from utils.question_answer_model import generate_title

rooms = {}
chats = {}
@app.route('/create-room', methods=['POST'])
def create_room():
    data = request.json
    title = generate_title()  # Call your ML model here to generate a title
    room_id = str(uuid.uuid4())
    rooms[room_id] = {
        'title': title,
        'users': []
    }
    return jsonify({'room_id': room_id, 'title': title})


@app.route('/get-rooms', methods=['GET'])
def get_rooms():
    return jsonify(rooms)


@socketio.on('join')
def handle_join(data):
    username = data['username']
    room_id = data['room_id']

    if room_id not in rooms:
        # Create a new room if it does not exist
        title = generate_title()  # Call your ML model here to generate a title
        rooms[room_id] = {
            'title': title,
            'users': []
        }
        emit('room_created', {'room_id': room_id, 'title': title})

    join_room(room_id)
    rooms[room_id]['users'].append(username)
    emit('user_joined', {'username': username, 'room_id': room_id}, to=room_id)


@socketio.on('leave')
def handle_leave(data):
    username = data['username']
    room_id = data['room_id']
    if room_id in rooms:
        leave_room(room_id)
        rooms[room_id]['users'].remove(username)
        emit('user_left', {'username': username, 'room_id': room_id}, to=room_id)
    else:
        emit('error', {'message': 'Room does not exist'})


@socketio.on('message')
def handle_message(data):
    room_id = data['room_id']
    username = data['username']
    message = data['message']

    # Check if it's a command
    if message.startswith('/bot'):
        response = "COMMAND"
        emit('bot_response', {'username': 'Bot', 'message': response}, to=room_id)
    else:
        # Broadcast message to the room
        emit('message', {'username': username, 'message': message}, to=room_id)

    # Save message to in-memory store (replace with database integration)
    if room_id not in chats:
        chats[room_id] = []
    chats[room_id].append({'username': username, 'message': message})


@app.route('/get-chats/<room_id>', methods=['GET'])
def get_chats(room_id):
    if room_id in chats:
        return jsonify(chats[room_id])
    return jsonify({'error': 'Room not found'}), 404

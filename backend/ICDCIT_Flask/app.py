import PyPDF2
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, join_room, leave_room, emit
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)
import routes.chat
import routes.question
import routes.user

if __name__ == '__main__':
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)

from flask import request, jsonify
from __main__ import app

from utils.database_queries import get_user_details


@app.route('/get-user/<user_id>', methods=['GET'])
def get_user(user_id):

    user = get_user_details(user_id)
    if user:
        return jsonify(user)
    else:
        return jsonify({'error': 'User not found'}), 404
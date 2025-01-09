import os
import psycopg2
from psycopg2.extras import RealDictCursor
from urllib.parse import urlparse

from utils.environment_variables import DATABASE_URL
from utils.question_answer_model import generate_title

url = urlparse("postgresql://postgres.bjwkobwaiuaqnxddotvd:GNpby89hMupnge3M@aws-0-ap-south-1.pooler.supabase.com:6543/postgres")

def update_chatbot_room(chatBotRoomId, message, messageType):
    conn = psycopg2.connect(
        dbname=url.path[1:],
        user=url.username,
        password=url.password,
        host=url.hostname,
        port=url.port
    )
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    insert_query = """
    INSERT INTO chatbot_message (chatbot_message, message_type, chatbot_room_id)
    VALUES (%s, %s, %s)
    """
    cursor.execute(insert_query, (message, messageType, chatBotRoomId))
    conn.commit()
    cursor.close()
    conn.close()

def get_user_details(user_id):
    conn = psycopg2.connect(
        dbname=url.path[1:],
        user=url.username,
        password=url.password,
        host=url.hostname,
        port=url.port
    )
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    select_query = "SELECT * FROM users WHERE user_id = %s"
    cursor.execute(select_query, (user_id,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    return user


def update_room_title(chatBotRoomId):
    conn = psycopg2.connect(
        dbname=url.path[1:],
        user=url.username,
        password=url.password,
        host=url.hostname,
        port=url.port
    )
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    select_query = "SELECT title FROM chatbot_room WHERE chatbot_room_id = %s"
    cursor.execute(select_query, (chatBotRoomId,))
    result = cursor.fetchone()
    if result and result['title']:
        cursor.close()
        conn.close()
        return  # Title already set, do not update

    title = generate_title()
    update_query = """
    UPDATE chatbot_room
    SET title = %s
    WHERE chatbot_room_id = %s
    """
    cursor.execute(update_query, (title, chatBotRoomId))
    conn.commit()
    cursor.close()
    conn.close()

def get_all_proficiencies():
    conn = psycopg2.connect(
        dbname=url.path[1:],
        user=url.username,
        password=url.password,
        host=url.hostname,
        port=url.port
    )
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    select_query = "SELECT DISTINCT proficiency_name FROM proficiency"
    cursor.execute(select_query)
    proficiencies = cursor.fetchall()
    cursor.close()
    conn.close()
    return [proficiency['proficiency_name'] for proficiency in proficiencies]
import os

from dotenv import load_dotenv
from groq import Groq
from pymongo import MongoClient
from ds.config.config import settings as config
import mysql.connector

load_dotenv()

 # Use your MongoDB URI
client = MongoClient(config["chats"]["db_url"])
db = client[config["chats"]["db_name"]]
chat_collection = db[config["chats"]["db_collection"]]

mydb = mysql.connector.connect(
  host="localhost",
  user="yourusername",
  password="yourpassword"
)


class LoadChat:
    def __init__(self,session_id: str):
        self.client = Groq(
            api_key=os.getenv("GROQ_API_KEY"),
        )
        self.session_id = session_id

        existing_chat = chat_collection.find_one({"session_id": session_id})
        if existing_chat:
            self.chat_history = existing_chat["messages"]
        else:
            self.chat_history = []
            chat_collection.insert_one({"session_id": session_id, "messages": self.chat_history})

    def get_response(self,user_message):

        self.chat_history.append({"role": "user", "content": user_message})

        chat_completion = self.client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=self.chat_history,
            temperature=1,
            max_completion_tokens=1024,
            top_p=1,
            stream=True,
            stop=None,
        )
        
        response_text = ""
        
        for chunk in chat_completion:
            content = chunk.choices[0].delta.content or ""
            print(content, end="")
            response_text += content
            
            
        self.chat_history.append({"role": "assistant", "content": response_text})

        # Update MongoDB with new history
        chat_collection.update_one(
            {"session_id": self.session_id},
            {"$set": {"messages": self.chat_history}},
        )

        return response_text


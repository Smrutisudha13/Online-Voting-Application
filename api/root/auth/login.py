import bcrypt
from flask import jsonify, request
from flask_restful import Resource
from flask_jwt_extended import create_access_token

from root.db import get_mongo_db

mdb = get_mongo_db()

class Login(Resource):
    def post(self):
        input_data = request.get_json(force=True)
        email_or_username = input_data.get("username")
        password = input_data.get("password")

        user = mdb.Users.find_one({
            "$or": [
                {"email": email_or_username},
                {"username": email_or_username}
            ]
        })

        if not user:
            return {
                "status": 0,
                "class": "error",
                "message": "User not found",
            }

        if not bcrypt.checkpw(password.encode("utf-8"), user["password"].encode("utf-8")):
            return {
                "status": 0,
                "class": "error",
                "message": "Incorrect password",
            }, 401

        access_token = create_access_token(identity=user["_id"])

        # Include the username in the response
        response_data = {
            "status": 1,
            "class": "success",
            "message": "Login successful",
            "access_token": access_token,
            "username": user["username"]  # Include the username here
        }

        return response_data, 200

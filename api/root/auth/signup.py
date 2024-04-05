import random
import string
from flask import jsonify, request
from flask_restful import Resource
from flask_jwt_extended import create_access_token
import bcrypt
from root.db import get_mongo_db

mdb = get_mongo_db()

class UserSignUpForm(Resource):
    def post(self):
        input_data = request.get_json(force=True)
        email = input_data.get("email")
        password = input_data.get("password")
        firstName = input_data.get("firstName")
        middleName = input_data.get("middleName")
        lastName = input_data.get("lastName")
        age = input_data.get("age")
        birthDate = input_data.get("dateOfBirth")
        username = input_data.get("username")
        mobilenumber = input_data.get("mobileNumber")
        sex = input_data.get("sex")

        # Check if the user already exists
        existing_user = mdb.Users.find_one({
            "$or": [
                        {"email": email},
                        {"username": username}
                    ]
        })

        if existing_user:
            return {
                "status": 0,
                "class": "error",
                "message": "User already exists",
            }, 400  # Return a 400 Bad Request status

        # Hash the password for security
        hashed_password = bcrypt.hashpw(
            password.encode("utf-8"), bcrypt.gensalt())
        

        last_id = None
        next_id = 1

        # Find the last document and retrieve its _id field
        last_document = mdb.Users.find({}, {"_id": 1}).sort([("_id", -1)]).limit(1)
                
        # Extract the _id value from the result (assuming it exists)
        for doc in last_document:
            last_id = doc.get("_id")

        # Print the last_id
        print("Last _id:", last_id)

        # Calculate the next_id
        if last_id is not None:
            next_id = last_id + 1

        # Print the next_id
        print("Next _id:", next_id)
  
        # Create a new user
        new_user = {
            "_id": next_id,
            "email": email,
            # Decode the bytes to store as a string
            "password": hashed_password.decode('utf-8'),
            "username": username,
            "mobilenumber": mobilenumber,
            "firstName": firstName,
            "lastName": lastName,
            "middleName": middleName,
            "age": age,
            "birthDate" : birthDate,
            "sex" : sex
        }
        
        mdb.Users.insert_one(new_user)

        return {
            "status": 1,
            "class": "success",
            "message": "Signup successful",
        }, 201  # Return a 201 Created status
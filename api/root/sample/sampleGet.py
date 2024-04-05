from flask_restful import Resource
from flask import request
from root.auth.utils import auth_required
from root.db import get_mongo_db

mdb = get_mongo_db()

class SampleGetRoute(Resource):
    def get(self):
        users = []
        for item in mdb.Users.find({}):
            users.append(item)
        return {
            "status": 1,
            "class": "success",
            "message": "Success",
            "payload": {
                "users": users
            }
        }
    
# class SamplePostRoute(Resource):
#     def post(self):
#         try:
#             # Parse JSON data from the request
#             data = request.get_json()

#             # Extract registration information from the JSON data
#             firstName = data.get('firstName')
#             lastName = data.get('lastName')
#             middleName = data.get('middleName')
#             age = data.get('age')
#             gender = data.get('gender')
#             email = data.get('email')
#             phone = data.get('phone')
#             username = data.get('username')
#             password = data.get('password')
#             birthDate = data.get('birthDate')

#             # Create a new user object
#             newUser = {
#                 "firstName": firstName,
#                 "lastName": lastName,
#                 "middleName": middleName,
#                 "age": age,
#                 "gender": gender,
#                 "email": email,
#                 "phone": phone,
#                 "username": username,
#                 "password": password,
#                 "birthDate": birthDate
#             }

#             # Insert the new user data into the MongoDB database
#             response = mdb.Users.insert_one(newUser)
#             print('response', response)

#             users = []
#             for item in mdb.Users.find({}):
#                 users.append(item)

#             return {
#                 "status": 1,
#                 "class": "success",
#                 "message": "User registration successful",
#                 "payload": {
#                     "users": users
#                 }
#             }

#         except Exception as e:
#             # Handle any exceptions that may occur during registration
#             print('Error during registration:', str(e))
#             return {
#                 "status": 0,
#                 "class": "error",
#                 "message": "User registration failed",
#                 "payload": None
#             }, 500
        
# class SamplePutRoute(Resource):
#     def put(self):
#         updateDOB = {
#             "birthDate": "1999-10-10",
#         }
#         filter = {"_id":11}
#         response = mdb.Users.update_one(filter,{"$set" :updateDOB})
#         print ('response',response)
        
#         users = mdb.Users.find_one(filter)
#         return {
#             "status": 1,
#             "class": "success",
#             "message": "Success",
#             "payload": {
#                 "users": users
#             }
#         }
    
# class SampleDeleteRoute(Resource):
#     def delete(self):
#         filter = {"_id":11}
#         response = mdb.Users.delete_one(filter)
#         print ('response',response)
        
#         users = []
#         for item in mdb.Users.find({}):
#             users.append(item)
#         return {
#             "status": 1,
#             "class": "success",
#             "message": "Success",
#             "payload": {
#                 "users": users
#             }
#         }
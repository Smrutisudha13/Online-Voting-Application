from flask_restful import Resource
from root.auth.utils import auth_required


class CurrentUser(Resource):
    @auth_required(isOptional=True)
    def get(self, suid):
        user = {
            "uid": "testUid",
            "name": "Sample Name",
            "email": "sample@gmail.coom",
        }
        # query users collection and get user data

        return {
            "status": 1,
            "class": "success",
            "payload": user,
        }

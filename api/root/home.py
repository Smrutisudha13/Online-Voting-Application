from flask_restful import Resource


class Home(Resource):
    def get(self):
        print('get: ')
        return {
            "status": 1,
            "class": "success",
            "message": "Success",
            "payload": {},
        }

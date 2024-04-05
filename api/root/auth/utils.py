from functools import wraps
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request


def auth_required(**kwargs):
    isOptional = kwargs.get("isOptional", False)

    def decorator(fn):
        @jwt_required(optional=isOptional)
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request(optional=isOptional)

            suid = get_jwt_identity()

            if validateAccess(suid):
                return {
                    "status": 0,
                    "message": "Unauthorized Access",
                    "payload": {
                        "redirectUrl": "/",
                    },
                }, 401

            return fn(*args, **kwargs, suid=suid)

        return wrapper

    return decorator


def validateAccess(suid):
    # query db and vaidate user

    return False

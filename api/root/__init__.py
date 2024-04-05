from flask import Flask
from flask_cors import CORS

from flask_jwt_extended import JWTManager
from flask_restful import Api

api = Api()


def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config["JWT_SECRET_KEY"] = "OWN-SECRET-KEY-SAMPLE"

    jwt = JWTManager(app)

    CORS(app)

    ## Home
    from .home import Home

    api.add_resource(Home, "/", endpoint="Home")

    ## Auth (Login, Logout, Register)
    ## ----------
    from root.auth import auth_bp

    app.register_blueprint(auth_bp)

    ## Sample
    ## ----------
    from root.sample import sample_bp

    app.register_blueprint(sample_bp)

    api.init_app(app)

    return app

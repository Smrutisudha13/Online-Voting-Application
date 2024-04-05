from flask import Blueprint
from flask_restful import Api


sample_bp = Blueprint("sample", __name__)
sample_api = Api(sample_bp)

from . import __routes__
from root.auth.currentUser import CurrentUser
from root.auth.login import Login
from root.auth.signup import UserSignUpForm
from . import auth_api

auth_api.add_resource(Login, "/user/login")
auth_api.add_resource(CurrentUser, "/user")
auth_api.add_resource(UserSignUpForm, "/user/signup")
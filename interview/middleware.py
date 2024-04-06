from flask import jsonify, request
from .models import User
from interview import app
import jwt
from functools import wraps


# Middleware for authentication, if no token found, 401 UNAUTHORIZED
def auth_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        jwt_token = request.cookies.get('token')
        if not jwt_token:
            return jsonify({"message": "Missing Token","status": "401"}), 401
        try:
            payload = jwt.decode(jwt_token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Expired Token","status": "401"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid Token","status": "401"}), 401
        user = User.query.filter_by(username=payload['user']).first()
        if user == None:
            return jsonify({"message": "User Does Not Exist","status": "401"}), 401
        return f(user, *args, **kwargs)
    return decorated
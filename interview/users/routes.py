from flask import Blueprint, jsonify, request, make_response
from interview.models import db, User
from flask_bcrypt import Bcrypt
from interview import app
import jwt
from functools import wraps
from datetime import datetime,timedelta
from interview.middleware import auth_required

users = Blueprint('users', __name__)

app.config['SECRET_KEY'] = 'houstonhall'

bcrypt = Bcrypt(app)

# Gets all users in the database
@users.route('/api/users', methods=['GET'])
def user_get():
    users = db.session.query(User.id, User.username).all()
    return jsonify({"users": [{"id":u.id, "username": u.username} for u in users], "status": "200"})


# Creates a new user
@users.route('/api/users', methods=['POST'])
def user_post():
    print("HELLO")
    req_data = request.get_json()
    username = req_data['username']
    password = req_data['password']
    pass_hash = bcrypt.generate_password_hash(password)
    if User.query.filter_by(username=username).first():
        return jsonify({"message": "User Already Exists","status": "400"}), 400
    user = user = User(username=username, password=pass_hash)
    db.session.add(user)
    db.session.commit()
    return jsonify({"user": {"id": user.id, "username": user.username}, "status": "200"})

# Deletes a user
# You can delete users if you are logged in as them
@users.route('/api/users', methods=['DELETE'])
@auth_required
def user_delete(user):
    if user == None:
        return jsonify({"message": "User Does Not Exist","status": "400"}), 400
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User Deleted","status": "200"}), 200

# Logs in a user, returns a token
@users.route('/api/users/login', methods=['POST'])
def user_login():
    req_data = request.get_json()
    username = req_data['username']
    password = req_data['password']
    user = User.query.filter_by(username=username).first()
    if user == None:
        return jsonify({"message": "User Not Found","status": "400"}), 400
    if bcrypt.check_password_hash(user.password, password):
        token = jwt.encode({'user': user.username, 'exp': datetime.utcnow() + timedelta(minutes=60)}, app.config['SECRET_KEY'])
        resp = make_response(jsonify({"login": "success",  "user": user.to_json(), "status": "200"}))
        resp.set_cookie('token', token, httponly=True)
        return resp
    else:
        return jsonify({"login": "failure", "status": "400"}), 400

# Logs out a user, deletes the token
@users.route('/api/users/logout', methods=['POST'])
def user_logout():
    resp = make_response(jsonify({"logout": "success", "status": "200"}))
    resp.set_cookie('token', '', expires=0)
    return resp
 
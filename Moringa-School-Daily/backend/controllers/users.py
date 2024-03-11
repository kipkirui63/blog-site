from flask import Flask, request, make_response, jsonify
from flask_restful import Api, Resource, abort
from flask_bcrypt import Bcrypt
from models import User,db,Profile, Content, Comment
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

bcrypt = Bcrypt()
jwt = JWTManager()

class Users(Resource):
    def get(self):
        users_list = []
        profiles = {profile.user_id: profile for profile in Profile.query.all()}
        for user in User.query.all():
            profile_info = profiles.get(user.id)
            user_dict = {
                "id": user.id,
                "firstname": user.firstname,
                "lastname": user.lastname,
                "role": user.role,
                "email": user.email,
                "profile": {
                    "bio": profile_info.bio if profile_info else None,
                    "profile_picture": profile_info.profile_picture if profile_info else None
                }
            }
            users_list.append(user_dict)
        return make_response(jsonify(users_list), 200)
    
    def post(self):
        data = request.get_json()
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            abort(409, detail="User Already Exists")
        if data['password'] == data['confirm-password']:
            hashed_password = bcrypt.generate_password_hash(data['password'])
            # Check if role is provided, otherwise default to "user"
            role = data.get('role', 'user')
            new_user = User(firstname=data['firstname'], lastname=data['lastname'], email=data['email'], password=hashed_password, role=role)
            db.session.add(new_user)
            db.session.commit()
            return make_response(jsonify(new_user.to_dict()), 201)
        else:
            abort(403, detail="Password and Confirm Password do not match")

    
class UserLogin(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        if not user:
            abort(404, detail="User does not exist")
        if not bcrypt.check_password_hash(user.password, data['password']):
            abort(403, detail="Password is not correct")
        metadata = {"role": user.role}
        token = create_access_token(identity=user.email, additional_claims=metadata)
        return {"jwt-access-token": token}

class UserById(Resource):
    def get(self,id):
        users_list = []
        profiles = {profile.user_id: profile for profile in Profile.query.filter_by(id=id)}
        for user in User.query.filter_by(id=id):
            profile_info = profiles.get(user.id)
            user_dict = {
                "id": user.id,
                "firstname": user.firstname,
                "lastname": user.lastname,
                "role": user.role,
                "email": user.email,
                "profile": {
                    "bio": profile_info.bio if profile_info else None,
                    "profile_picture": profile_info.profile_picture if profile_info else None
                }
            }
            users_list.append(user_dict)
        return make_response(jsonify(users_list), 200)
    
    def patch(self,id):
        user = User.query.get(id)
        if not user:
            abort(404, detail = f'User with {id=} does not exist')
        data = request.get_json()
        for key, value in data.items():
            if value is None:
                continue
            setattr(user, key, value)
        db.session.commit()
        return user.to_dict()
    
    def delete(self,id):
        user = User.query.filter_by(id=id).first()
        if not user:
            abort(404, detail = f'User with {id=} does not exist')
        contents = Content.query.filter(Content.user_id == id).all()
        comments = Comment.query.filter(Comment.user_id == id).all()
        profiles = Profile.query.filter(Profile.user_id==id).all()
        for content in contents:
            db.session.delete(content)
        for comment in comments:
            db.session.delete(comment)
        for profile in profiles:
            db.session.delete(profile)
        
        db.session.delete(user)
        db.session.commit()
        return {"detail": f"user with {id=} has been deleted successfully"}

class UserByToken(Resource):
    @jwt_required()
    def get(self):
        current_user_email = get_jwt_identity()
        print(current_user_email)
        current_user = User.query.filter_by(email=current_user_email).first()
        if not current_user:
            abort(404, detail="User not found")
        return make_response(jsonify(current_user.to_dict()), 200)
        
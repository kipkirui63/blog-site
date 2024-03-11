from flask import jsonify, request,make_response
from models import Profile,db
from flask_restful import Resource


class Profiles(Resource):
    def post(self):
        data = request.get_json()
        profile = Profile(profile_picture = data['profile_picture'],bio = data['bio'],user_id=data['user_id'])
        db.session.add(profile)
        db.session.commit()
        return make_response(jsonify(["Profile Added successfully"]),200)
    
    def get(self):    
        profiles_list=[]
        for profile in Profile.query.all():

            profile_dict = {
            "id":profile.id,
            "profile_picture":profile.profile_picture,
            "bio":profile.bio,
            "user_id":profile.user_id
            }
            profiles_list.append(profile_dict)
        return make_response(jsonify(profiles_list),200)
    

class ProfileByID(Resource):
    def get(self,id):
        profile = Profile.query.get(id)
        profile_dict = {
            "id":profile.id,
            "profile_picture":profile.profile_picture,
            "bio":profile.bio,
            "user_id":profile.user_id
        }
        return make_response(jsonify(profile_dict),200) 

    def patch(self,id):
        profile =Profile.query.get(id)
        data = request.json
        for field in ['id','profile_picture','bio','user_id']:
            if field in data:
                setattr(profile,field,data[field])
        db.session.commit()
        return make_response(jsonify(["Profile updated successfully"]),200)
    
    def delete(self,id):
        profile = Profile.query.get(id)
        db.session.delete(profile)
        db.session.commit()
        return make_response(jsonify(["Deleted successfully"]),200)
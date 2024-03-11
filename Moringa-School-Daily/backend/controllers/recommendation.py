from models import Recommendation,db
from flask import jsonify,request, make_response
from flask_restful import Resource

class Recommendations(Resource):
    def post(self):
        data = request.get_json()
        recommendation = Recommendation(content_id=data['content_id'], user_id=data['user_id'])
        try:
            db.session.add(recommendation)
            db.session.commit()
            return make_response(jsonify({"message": "recommendation created successfully"}), 201)
        except Exception as e:
            return make_response(jsonify({"error": "Data not created"}), 404)

    def get(self):
        recommendations_list = []
        recommendations = Recommendation.query.all()
        if recommendations:
            for recommendation in recommendations:
                recommendation_dict={
                    "id": recommendation.id,
                    "user_id":recommendation.user_id,
                    "content_id": recommendation.content_id
            }
                recommendations_list.append(recommendation_dict)
            return make_response(jsonify(recommendations_list), 200)
        return make_response(jsonify({"error": "recommendations not found"}), 404)
    
class RecommendationByID(Resource):
    def get(self, id):
        recommendation= Recommendation.query.filter_by(id=id).first()
        if recommendation:
            recommendation_dict={
                    "id": recommendation.id,
                    "user_id":recommendation.user_id,
                    "content_id": recommendation.content_id
            }
            return make_response(jsonify(recommendation_dict), 200)
        return make_response(jsonify({"error":"recommendation not found"}), 404)

    def patch(self, id):
        recommendation = Recommendation.query.filter_by(id=id).first()
        if recommendation:
            data = request.json
            for field in ["id","user_id","content_id"]:
                if field in data:
                    setattr(recommendation,field,data[field])
            db.session.commit()
            return make_response(jsonify({"message":"recommendation updated successfully"}), 201)
        return make_response(jsonify({"error":"recommendation not found"}), 404)

    def delete(self,id):
        recommendation = Recommendation.query.filter_by(id=id).first()
        if recommendation:
            db.session.delete(recommendation)
            db.session.commit()
            return make_response(jsonify({"message":"recommendation deleted successfully"}), 200)
        return make_response(jsonify({"error":"recommendation not found"}), 404)
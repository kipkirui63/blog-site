from models import Subscription,db
from flask import jsonify,request, make_response
from flask_restful import Resource

class Subscriptions(Resource):
    def post(self):
        data = request.get_json()
        subscription = Subscription(category_id=data['category_id'], user_id=data['user_id'])
        try:
            db.session.add(subscription)
            db.session.commit()
            return make_response(jsonify({"message": "Subscription created successfully"}), 201)
        except Exception as e:
            return make_response(jsonify({"error": "Data not created"}), 404)

    def get(self):
        subscriptions_list = []
        subscriptions = Subscription.query.all()
        if subscriptions:
            for subscription in subscriptions:
                subscription_dict = {
                    "id": subscription.id,
                    "user_id": subscription.user_id,
                    "category_id": subscription.category_id
                }
                subscriptions_list.append(subscription_dict)
            return make_response(jsonify(subscriptions_list), 200)
        return make_response(jsonify({"error": "Subscriptions not found"}), 404)

    
class SubscriptionByID(Resource):
    def get(self, id):
        subscription = Subscription.query.filter_by(id=id).first()
        if subscription:
            subscription_dict={
                    "id":subscription.id,               
                        "user_id":subscription.user_id,
                        "category_id":subscription.category_id
            }
            return make_response(jsonify(subscription_dict), 200)
        return make_response(jsonify({"error":"subscription not found"}),404)
    
    def patch(self, id):
        subscription = Subscription.query.filter_by(id=id).first()
        if subscription:
            data = request.json
            for field in ["id","user_id","category_id"]:
                if field in data:
                    setattr(subscription,field,data[field])
            db.session.commit()
            return make_response((jsonify({"message":"subscription updated successfully"}), 201))
        return make_response(jsonify({"error":"subscription not found"}), 404)
    
    def delete(self,id):
        subscription = Subscription.query.filter_by(id=id).first()
        if subscription:
            db.session.delete(subscription)
            db.session.commit()
            return make_response(jsonify({"message":"subscription deleted successfully"}), 200)
        return make_response(jsonify({"error":"subscription not found"}), 404)
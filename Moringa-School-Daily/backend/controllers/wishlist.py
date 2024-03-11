from models import Wishlist,db
from flask import jsonify,request, make_response
from flask_restful import Resource

class Wishlists(Resource):
    def post(self):
        data = request.get_json()
        recommendation = Wishlist(content_id=data['content_id'], user_id=data['user_id'])
        try:
            db.session.add(recommendation)
            db.session.commit()
            return make_response(jsonify({"message": "wishlist created successfully"}), 201)
        except Exception as e:
            return make_response(jsonify({"error": "Data not created"}), 404)

    def get(self):
        wishlist_items = []
        wishlists  = Wishlist.query.all()
        if wishlists:
            for wishlist in wishlists:
                wishlist_dict={
                    "id":wishlist.id,               
                        "user_id":wishlist.user_id,
                        "content_id":wishlist.content_id
            }
                wishlist_items.append(wishlist_dict)
            return make_response(jsonify(wishlist_items), 200)
        return make_response(jsonify({"error": "wishlists not found"}), 404)
    
    
class WishlistByID(Resource):
    def get(self, id):        
        wishlist = Wishlist.query.filter_by(id=id).first()
        if wishlist:
            wishlist_dict={
                    "id":wishlist.id,               
                        "user_id":wishlist.user_id,
                        "content_id":wishlist.content_id
            }
            return make_response(jsonify(wishlist_dict), 200)
        return  make_response(jsonify({"error":"wishlist not found"}))
    
    def patch(self, id):
        wishlist = Wishlist.query.filter_by(id=id).first()
        if wishlist:
            data = request.json
            for field in ["id","user_id","content_id"]:
                if field in data:
                    setattr(wishlist,field,data[field])
            db.session.commit()
            return make_response(jsonify({"message":"Wishlist updated successfully"}), 201)
        else:
            return make_response(jsonify({"error":"Wishlist not found"}), 404)
        
    def delete(self,id):
        wishlist = Wishlist.query.filter_by(id=id).first()
        if wishlist:
            db.session.delete(wishlist)
            db.session.commit()
            return make_response(jsonify({"message":"Wishlist deleted successfully"}), 200)
        return make_response(jsonify({"error":"wishlist not found"}), 404)
from flask import jsonify, request,make_response
from models import Category,db
from flask_restful import Resource

#Creating/Posting category
class Categories(Resource):
    def post(self):
        data = request.get_json()
        category = Category(name=data['name'],user_id=data['user_id'])
        db.session.add(category)
        db.session.commit()
        return make_response(jsonify(['Category Added successfuly']),200) 
       
    
#Getting all categories
    def get(self):
        category_list=[]
        for category in Category.query.all():
            category_dict={
               "id":category.id,               
                "name":category.name
                          
                }
            category_list.append(category_dict)
        return make_response(jsonify(category_list),200)
    
    
class CategoryByID(Resource):
    def get(self,id):
        category = Category.query.get(id)
        category_dict={
               "id":category.id,               
                "name":category.name
                          
                }
        return make_response(jsonify(category_dict),200)
    
    #update category
    def patch(self,id):
        category = Category.query.get(id)
        data = request.json
        for field in ['id','name']:
            if field in data:
                setattr(category,field,data[field])
        db.session.commit()
        return make_response(jsonify(['Category updated successfully']),200)

    def delete(self,id):
        category = Category.query.filter_by(id=id).first()
        db.session.delete(category)
        db.session.commit()
        return make_response(jsonify(["Deleted successfully"]),200)
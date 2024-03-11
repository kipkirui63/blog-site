from models import db, Content, Category, User, Comment
from flask import jsonify, request, make_response
from datetime import datetime
from flask_restful import Resource
from controllers.updates import notify_admins, notify_users


class Contents(Resource):
    def post(self):
        data = request.get_json()
        content = Content(
            title=data['title'],
            description=data['description'],
            content_type=data['content_type'],
            image_url=data['image_url'],
            user_id=data["user_id"],
            category_id=data['category_id']
        )
        db.session.add(content)
        db.session.commit()
        notify_admins(content)
        notify_users(content)
        return make_response(jsonify(content.to_dict()), 201)

    def get(self):
        content_list = []
        for content in Content.query.all():
            user = User.query.filter_by(id=content.user_id).first()
            added_by = {"firstname": user.firstname, "lastname": user.lastname, "user_id": user.id } if user else {}
            comments = Comment.query.filter_by(content_id=content.id).all()
            post_comments = [{"comment": comment.comment, "user": User.query.filter_by(id=comment.user_id).first().firstname } for comment in comments]
            content_dict = {
                "id": content.id,
                "title": content.title,
                "description": content.description,
                "content_type": content.content_type,
                "published_date": content.published_date,
                "image_url": content.image_url,
                "likes": content.likes,
                "dislikes": content.dislikes,
                "flagged": content.flagged,
                "public_status": content.public_status,
                "added_by": added_by,
                "category_id": [category.name for category in Category.query.filter_by(id=content.category_id)],
                "comments": post_comments
            }
            content_list.append(content_dict)
        return make_response(jsonify(content_list), 200)

class ContentByID(Resource):
    def get(self, id):
        content = Content.query.filter_by(id=id).first()
        user = User.query.filter_by(id=content.user_id).first()
        added_by = {"firstname": user.firstname, "lastname": user.lastname, "user-id": user.id} if user else {}
        comments = Comment.query.filter_by(content_id=content.id).all()
        post_comments = [{"comment": comment.comment, "user": User.query.filter_by(id=comment.user_id).first().email } for comment in comments]
        content_dict = {
            "id": content.id,
            "title": content.title,
            "description": content.description,
            "content_type": content.content_type,
            "published_date": content.published_date,
            "image_url": content.image_url,
            "likes": content.likes,
            "dislikes": content.dislikes,
            "flagged": content.flagged,
            "public_status": content.public_status,
            "added_by": added_by,
            "category_id": [category.name for category in Category.query.filter_by(id=content.category_id)],
            "comments": post_comments
        }
        return make_response(jsonify(content_dict), 200)

    def patch(self, id):
        content = Content.query.filter_by(id=id).first()
        data = request.get_json()
        for field in ['id', 'title', 'description', 'content_type', 'published_date', 'image_url', 'likes', 'dislikes', 'flagged', 'public_status']:
            if field in data:
                setattr(content, field, data[field])
        db.session.commit()
        return make_response(jsonify('Content updated successfully'), 200)

    def delete(self, id):
        content = Content.query.get(id)
        if content:
            comments = Comment.query.filter(Comment.content_id == id).all()
            for comment in comments:
                db.session.delete(comment)
            db.session.delete(content)
            db.session.commit()
            return make_response(jsonify(['Deleted successfully']), 200)
        else:
            return make_response(jsonify(['Content not found']), 404)

class ContentCategory(Resource):
    def get(self, id):
        content_list = []
        for content in Content.query.filter_by(category_id=id).all():
            user = User.query.filter_by(id=content.user_id).first()
            added_by = {"firstname": user.firstname, "lastname": user.lastname, "user_id": user.id } if user else {}
            comments = Comment.query.filter_by(content_id=content.id).all()
            post_comments = [{"comment": comment.comment, "user": User.query.filter_by(id=comment.user_id).first().firstname } for comment in comments]
            content_dict = {
                "id": content.id,
                "title": content.title,
                "description": content.description,
                "content_type": content.content_type,
                "published_date": content.published_date,
                "image_url": content.image_url,
                "likes": content.likes,
                "dislikes": content.dislikes,
                "flagged": content.flagged,
                "public_status": content.public_status,
                "added_by": added_by,
                "category_id": [category.name for category in Category.query.filter_by(id=content.category_id)],
                "comments": post_comments
            }
            content_list.append(content_dict)
        return make_response(jsonify(content_list), 200)
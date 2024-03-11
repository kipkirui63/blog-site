from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from sqlalchemy.orm import validates
import re
from sqlalchemy import event


db=SQLAlchemy()

class User(db.Model,SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key = True)
    firstname = db.Column(db.String(50))
    lastname = db.Column(db.String(50))
    email = db.Column(db.String(50), unique= True)
    password = db.Column(db.String(50))
    role = db.Column(db.String(50), default='USER')

    @validates('role')
    def validate_role(self, key, role):
        valid_roles = {'ADMIN', 'TECH-WRITER', 'USER'}
        normalized_role = role.upper()  
        if role.upper() not in valid_roles:
            raise ValueError("Role must be 'ADMIN', 'TECH-WRITER' or 'USER'")
        return normalized_role
    
    @validates('email')
    def validate_email(self, key, email):
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise ValueError("Invalid email address")
        return email
    

    #comments = db.relationship("Comment" ,backref = 'user',lazy = True)
    #contents = db.relationship("Content",back_populates='users',lazy = True)
    #wishlist = db.relationship("Wishlist", backref='user',uselist = False)
    #profile = db.relationship("Profile", backref = "user", uselist=False)
   # subscriptions = db.relationship("Subscription",backref = "user",lazy = True)
   # recommendations = db.relationship("Recommendation", backref='user',lazy=True) 

class Content(db.Model,SerializerMixin):
    __tablename__ = 'contents'
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(50))
    description = db.Column(db.String(350))
    content_type = db.Column(db.String(50))
    published_date = db.Column(db.DateTime, default=datetime.utcnow) 
    image_url = db.Column(db.String(250))
    likes = db.Column(db.Integer, default=0)
    dislikes = db.Column(db.Integer, default=0)
    flagged = db.Column(db.Boolean, default = False)
    public_status = db.Column(db.Boolean, default = False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))

    #comments = db.relationship('Comment',backref = 'content',lazy=True)
    #users = db.relationship("User",back_populates = 'contents',lazy=True )
    #recommendations = db.relationship('Recommendation', backref = 'content')

class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'
    id =  db.Column(db.Integer, primary_key = True) 
    name = db.Column(db.String(50), unique = True)
    user_id=db.Column(db.Integer(), db.ForeignKey('users.id'))

    #contents = db.relationship("Content", backref = 'category', lazy=True)
    
class Profile(db.Model,SerializerMixin):
    __tablename__ = 'profiles'
    id = db.Column(db.Integer, primary_key = True)
    profile_picture = db.Column(db.String)
    bio = db.Column(db.String(200))
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'),unique = True)

class Comment(db.Model,SerializerMixin):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key = True)
    comment = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    content_id = db.Column(db.Integer,db.ForeignKey('contents.id'))

class Wishlist(db.Model,SerializerMixin):
    __tablename__ = 'wishlists'
    id = db.Column(db.Integer, primary_key = True)
    content_id = db.Column(db.Integer,db.ForeignKey('contents.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    contents = db.relationship('Content',backref= 'wishlist',lazy = True)

class Subscription(db.Model,SerializerMixin):
    __tablename__ = 'subscriptions'
    id = db.Column(db.Integer, primary_key = True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'))

    categories = db.relationship("Category",backref = 'subscription',lazy =True)

class Recommendation(db.Model, SerializerMixin):
    __tablename__ = 'recommendations'
    id = db.Column(db.Integer, primary_key = True)
    content_id = db.Column(db.Integer, db.ForeignKey('contents.id'))
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'))

@event.listens_for(User, 'before_delete')
def delete_related_instances(mapper, connection, target):
    # Delete related instances when a user is deleted
    db.session.query(Content).filter(Content.user_id == target.id).delete()
    db.session.query(Profile).filter(Profile.user_id == target.id).delete()
    db.session.query(Comment).filter(Comment.user_id == target.id).delete()
    db.session.query(Wishlist).filter(Wishlist.user_id == target.id).delete()
    db.session.query(Subscription).filter(Subscription.user_id == target.id).delete()
    db.session.query(Recommendation).filter(Recommendation.user_id == target.id).delete()

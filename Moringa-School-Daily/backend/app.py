from flask import Flask, request, make_response, jsonify
from flask_restful import Api, Resource
from http import HTTPStatus
from controllers.users import Users,UserLogin,UserById,UserByToken,jwt
from controllers.recommendation import Recommendations, RecommendationByID
from controllers.subscription import Subscriptions, SubscriptionByID
from controllers.wishlist import Wishlists, WishlistByID
from controllers.category import Categories, CategoryByID
from controllers.comment import Comments,CommentByID
from controllers.content import Contents, ContentByID,ContentCategory
from controllers.profile import Profiles,ProfileByID
from flask_cors import CORS
from flask_migrate import Migrate
from datetime import timedelta
from models import db
from flask_mail import Mail

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///moringa-daily.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
app.config['SECRET_KEY'] = 'tvbubvhriefjkwerty='

app.config['MAIL_SERVER'] = "smtp.gmail.com"
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = "maureenchelangat955@gmail.com"
app.config['MAIL_PASSWORD'] = "otvacdbrljoiviir"
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

migrate = Migrate(app,db)

db.init_app(app)
jwt.init_app(app)

CORS(app)

api = Api(app)
mail=Mail(app)

class Home(Resource):
    
    def get(self):
        response_dict = {
            "Message": "Moringa School Daily API",
        }
        response = make_response(
            response_dict,
            HTTPStatus.OK,
        )
        return response

api.add_resource(Home, '/')
api.add_resource(Recommendations, '/recommendations')
api.add_resource(RecommendationByID, '/recommendations/<int:id>')
api.add_resource(Subscriptions, '/subscriptions')
api.add_resource(SubscriptionByID, '/subscriptions/<int:id>')
api.add_resource(Wishlists, '/wishlists')
api.add_resource(WishlistByID, '/wishlists/<int:id>')
api.add_resource(Users,'/users')
api.add_resource(UserLogin,'/login')
api.add_resource(UserById,'/users/<int:id>')
api.add_resource(UserByToken,'/user-token')

api.add_resource(Categories, '/categories')
api.add_resource(CategoryByID, '/categories/<int:id>')
api.add_resource(Comments, '/comments')
api.add_resource(CommentByID, '/comments/<int:id>')
api.add_resource(Contents, '/contents')
api.add_resource(ContentByID, '/contents/<int:id>')
api.add_resource(ContentCategory,'/contents/category/<int:id>')
api.add_resource(Profiles, '/profiles')
api.add_resource(ProfileByID, '/profiles/<int:id>')

if __name__=='__main__':
    app.run()
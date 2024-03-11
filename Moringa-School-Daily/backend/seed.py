from flask import Flask
from faker import Faker
import random
from models import User, Content, Category, Comment, Profile, Recommendation, Subscription, Wishlist, db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///moringa-daily.db'

fake = Faker()

def seed_data():
    with app.app_context():
        # Create users
        for _ in range(10):
            firstname = fake.first_name()
            lastname = fake.last_name()
            email = fake.email()
            password = fake.password()
            role = random.choice(['ADMIN', 'TECH-WRITER', 'USER'])
            user = User(firstname=firstname, lastname=lastname, email=email, password=password, role=role)
            db.session.add(user)

        # Create categories
        for _ in range(5):
            name = fake.word()
            category = Category(name=name)
            db.session.add(category)

        # Create contents
        for _ in range(20):
            title = fake.sentence()
            description = fake.paragraph()
            content_type = random.choice(['Article', 'Video', 'Podcast'])
            published_date = fake.date_time_this_year()
            image_url = fake.image_url()
            likes = random.randint(0, 100)
            dislikes = random.randint(0, 50)
            flagged = fake.boolean()
            public_status = fake.boolean()
            user_id = random.randint(1, 10)
            category_id = random.randint(1, 5)
            content = Content(title=title, description=description, content_type=content_type,
                              published_date=published_date, image_url=image_url, likes=likes, dislikes=dislikes,
                              flagged=flagged, public_status=public_status, user_id=user_id, category_id=category_id)
            db.session.add(content)

        # Create profiles
        for user in User.query.all():
            if not user.profile:
                profile_picture = fake.image_url()
                bio = fake.text(max_nb_chars=200)
                profile = Profile(profile_picture=profile_picture, bio=bio, user=user)
                db.session.add(profile)

        # Create comments
        for _ in range(30):
            comment_text = fake.text(max_nb_chars=100)
            user_id = random.randint(1, 10)
            content_id = random.randint(1, 20)
            comment = Comment(comment=comment_text, user_id=user_id, content_id=content_id)
            db.session.add(comment)

        # Create recommendations
        for content in Content.query.all():
            user_id = random.randint(1, 10)
            recommendation = Recommendation(content=content, user_id=user_id)
            db.session.add(recommendation)

        # Create subscriptions
        for _ in range(20):
            category_id = random.randint(1, 5)
            user_id = random.randint(1, 10)
            subscription = Subscription(category_id=category_id, user_id=user_id)
            db.session.add(subscription)

        # Create wishlists
        for user in User.query.all():
            content_id = random.randint(1, 20)
            wishlist = Wishlist(content_id=content_id, user=user)
            db.session.add(wishlist)

        # Commit all changes
        db.session.commit()

if __name__ == '__main__':
    seed_data()

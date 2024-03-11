from models import User, Subscription
from flask_mail import Message


def notify_admins(new_content):
    # Notify admins about the new content for approval
    admins = User.query.filter_by(role='ADMIN').all()
    for admin in admins:
        send_notification_email(admin.email, f'New Content: {new_content.title} for approval')
    
def send_notification_email(user_email, content_title):
    from app import mail
    sender = 'maureenchelangat955@gmail.com'
    msg = Message('New Content Available', sender=sender, recipients=[user_email])
    msg.body = f'There is a new content available: {content_title}. Check it out!'
    mail.send(msg)

def notify_users(new_content):
    # Notify subscribers about the new content
    subscribers = Subscription.query.filter_by(category_id=new_content.category_id).all()
    author_id = new_content.user_id
    for subscriber in subscribers:
        user = User.query.get(subscriber.user_id)
        if user:
            if user.id != author_id:
                send_notification_email(user.email, new_content.title)

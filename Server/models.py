from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    db.init_app(app)
    with app.app_context():
        db.create_all()
    return db

class user_info(db.Model):
    id = db.Column(db.String(20), primary_key=True, nullable=False)
    pw = db.Column(db.String(20), nullable=False)
    name = db.Column(db.String(20), nullable=False)
    phone = db.Column(db.String(11), nullable=False)
    email = db.Column(db.String(30), nullable=False)
    nickname = db.Column(db.String(20), nullable=False)
    sex = db.Column(db.Boolean, nullable=False)
    birthday = db.Column(db.String(8), nullable=False)
    tag = db.Column(db.String(100), nullable=False)
    introduce = db.Column(db.String(150), nullable=True)
    admin = db.Column(db.Boolean, nullable=False)

class user_profile(db.Model):
    id = db.Column(db.String(20), primary_key=True, nullable=False)
    profile = db.Column(db.LargeBinary, nullable=True)

class story_like_list(db.Model):
    idx = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    story_idx = db.Column(db.Integer, nullable=False)
    id = db.Column(db.String(20), nullable=False)

class content_like_list(db.Model):
    idx = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    content_idx = db.Column(db.Integer, nullable=False)
    id = db.Column(db.String(20), nullable=False)

class story_dashboard(db.Model):
    idx = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    id = db.Column(db.String(20), nullable=False)
    title = db.Column(db.String(20), nullable=False)
    subtitle = db.Column(db.String(20), nullable=True)
    content = db.Column(db.String(200), nullable=False)
    tag = db.Column(db.String(100), nullable=False)
    day = db.Column(db.DateTime, nullable=False)
    like = db.Column(db.Integer, nullable=False, default=0)

class story_img(db.Model):
    idx = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    story_idx = db.Column(db.Integer, nullable=False)
    img = db.Column(db.LargeBinary, nullable=False)

class story_temporary_storage(db.Model):
    idx = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    id = db.Column(db.String(20), nullable=False)
    title = db.Column(db.String(20), nullable=True)
    subtitle = db.Column(db.String(20), nullable=True)
    content = db.Column(db.String(200), nullable=True)
    tag = db.Column(db.String(100), nullable=True)
    day = db.Column(db.DateTime, nullable=False)

class story_temporary_img(db.Model):
    idx = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    story_idx = db.Column(db.Integer, nullable=False)
    img = db.Column(db.LargeBinary, nullable=False)

class content_dashboard(db.Model):
    idx = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    id = db.Column(db.String(20), nullable=False)
    title = db.Column(db.String(20), nullable=False)
    subtitle = db.Column(db.String(20), nullable=True)
    content = db.Column(db.String(200), nullable=False)
    tag = db.Column(db.String(100), nullable=False)
    day = db.Column(db.DateTime, nullable=False)
    maxMember = db.Column(db.Integer, nullable=False)
    deadline = db.Column(db.DateTime, nullable=False)
    member = db.Column(db.Integer, nullable=False, default=0)
    like = db.Column(db.Integer, nullable=False, default=0)

class content_img(db.Model):
    idx = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    content_idx = db.Column(db.Integer, nullable=False)
    img = db.Column(db.LargeBinary, nullable=False)
    
class content_temporary_storage(db.Model):
    idx = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    id = db.Column(db.String(20), nullable=False)
    title = db.Column(db.String(20), nullable=True)
    subtitle = db.Column(db.String(20), nullable=True)
    content = db.Column(db.String(200), nullable=True)
    tag = db.Column(db.String(100), nullable=True)
    day = db.Column(db.DateTime, nullable=False)
    maxMember = db.Column(db.Integer, nullable=True)
    deadline = db.Column(db.DateTime, nullable=True)

class content_temporary_img(db.Model):
    idx = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    content_idx = db.Column(db.Integer, nullable=False)
    img = db.Column(db.LargeBinary, nullable=False)    

class content_member_list(db.Model):
    idx = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    content_idx = db.Column(db.Integer, nullable=False)
    id = db.Column(db.String(20), nullable=False)
    
class story_tag_list(db.Model):
    idx = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    story_idx = db.Column(db.Integer, nullable=False)
    tag = db.Column(db.String(10), nullable=False)
    
class content_tag_list(db.Model):
    idx = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    content_idx = db.Column(db.Integer, nullable=False)
    tag = db.Column(db.String(10), nullable=False)
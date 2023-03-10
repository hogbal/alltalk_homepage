from flask import Blueprint, request, jsonify
from models import user_info, user_profile, db

blue_signup = Blueprint("signup", __name__, url_prefix="/signup")

@blue_signup.route("/", methods=["POST"], strict_slashes=False)
def signup():
    if(request.method == "POST"):
        id = request.form.get("id",None)
        pw = request.form.get("pw",None)
        name = request.form.get("name",None)
        phone = request.form.get("phone",None)
        email = request.form.get("email",None)
        nickname = request.form.get("nickname",None)
        sex = request.form.get("sex", None, type=lambda isSex: isSex.lower() == 'true')
        birthday = request.form.get("birthday",None)
        tag = request.form.get("tag",None)
        admin = request.form.get("admin", None, type=lambda isAdmin: isAdmin.lower() == 'true')

        if(id and pw and name and phone and email and nickname and sex != None and birthday and tag and admin != None):
            try:
                new_user = user_info(id=id, pw=pw, name=name, phone=phone, email=email, nickname=nickname, sex=sex, birthday=birthday, tag=tag, admin=admin)
                new_user_profile = user_profile(id=id, profile=None)

                db.session.add(new_user)
                db.session.add(new_user_profile)
                db.session.commit()
                return jsonify({'result':True})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})
        
@blue_signup.route("/id", methods=["POST"])
def id():
    if(request.method == "POST"):
        id = request.form.get("id",None)

        if(id):
            try:
                user = user_info.query.filter(user_info.id==id).first()
                
                if(user):
                    return jsonify({'result':False})
                else:
                    return jsonify({'result':True})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})
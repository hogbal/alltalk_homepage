from flask import Blueprint, request, jsonify
from models import userInfo, db

blue_signup = Blueprint("signup", __name__, url_prefix="/signup")

@blue_signup.route("/", methods=["POST"])
def signup():
    if(request.method == "POST"):
        id = request.form.get("id","")
        pw = request.form.get("pw","")
        name = request.form.get("name","")
        phone = request.form.get("phone","")
        email = request.form.get("email","")
        nickname = request.form.get("nickname","")
        sex = request.form.get("sex","")
        birthday = request.form.get("birthday","")
        tag = request.form.get("tag","")
        admin = request.form.get("admin","")
        
        if(id != "" or pw != "" or name != "" or email != "" or nickname != "" or sex != "" or birthday != "" or tag != "" or admin != ""):
            try:
                new_user = userInfo(id=id, pw=pw, name=name, email=email, nickname=nickname, sex=sex, birthday=birthday, tag=tag, admin=admin)

                db.session.add(new_user)
                db.session.commit()
                return jsonify({'result':True})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})
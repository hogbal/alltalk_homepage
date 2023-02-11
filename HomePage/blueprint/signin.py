from flask import Blueprint, request, jsonify
from models import userInfo, db

blue_signin = Blueprint("signin", __name__, url_prefix="/signin")

@blue_signin.route("/", methods=["POST"])
def signup():
    if(request.method == "POST"):
        id = request.form.get("id","")
        pw = request.form.get("pw","")
        
        if(id != "" or pw != ""):
            try:
                user = userInfo.query.filter((userInfo.id==id) & (userInfo.pw==pw)).first()
                if(user != None):
                    return jsonify({'result':True})
                else:
                    return jsonify({'result':False})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})
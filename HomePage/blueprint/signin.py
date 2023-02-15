from flask import Blueprint, request, jsonify
from models import user_info, db

blue_signin = Blueprint("signin", __name__, url_prefix="/signin")

@blue_signin.route("/", methods=["POST"], strict_slashes=False)
def signup():
    if(request.method == "POST"):
        id = request.form.get("id",None)
        pw = request.form.get("pw",None)
        
        if(id and pw):
            try:
                user = user_info.query.filter((user_info.id==id) & (user_info.pw==pw)).first()
                if(user != None):
                    return jsonify({'result':True})
                else:
                    return jsonify({'result':False})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})
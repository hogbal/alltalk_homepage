from flask import Blueprint, request, jsonify
from models import member_list, db

blue_story = Blueprint("story", __name__, url_prefix="/story")

@blue_story.route("/participation", methods=["POST"])
def participation():
    if(request.method == "POST"):
        id = request.form.get("id", None)
        uid = request.form.get("uid", None)
        
        if(id and uid):
            try:
                newMemberList = member_list(idx=None, uid=uid, id=id)
                
                db.session.add(newMemberList)
                db.session.commit()
                return jsonify({'result':True})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})
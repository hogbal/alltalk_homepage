from flask import Blueprint, request, jsonify
from models import like_list, admin_dashboard, story_dashboard, db

blue_util = Blueprint("util", __name__, url_prefix="/util")

@blue_util.route("/like", methods=["POST"])
def like():
    if(request.method == "POST"):
        id = request.form.get("id",None)
        uid = request.form.get("uid",None)
        admin = request.form.get("admin", None, type=lambda isAdmin: isAdmin.lower() == 'true')
        
        if(id and uid):
            try:
                newLikeList = like_list(idx=None, id=id, dashboardUID=uid)
                if(admin):
                    adminDashboard = admin_dashboard.query.filter(admin_dashboard.uid==uid).first()
                    adminDashboard.like = adminDashboard.like+1
                else:
                    storyDashboard = story_dashboard.query.filter(story_dashboard.uid==uid).first()
                    storyDashboard.like = storyDashboard.like+1
                
                
                db.session.add(newLikeList)
                db.session.commit()
                return jsonify({'result':True})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})
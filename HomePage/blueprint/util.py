from flask import Blueprint, request, jsonify
from models import like_list, admin_dashboard, story_dashboard, admin_img, story_img, db

blue_util = Blueprint("util", __name__, url_prefix="/util")

@blue_util.route("/like", methods=["POST"])
def like():
    if(request.method == "POST"):
        id = request.form.get("id",None)
        uid = request.form.get("uid",None)
        
        if(id and uid):
            try:
                newLikeList = like_list(idx=None, id=id, dashboardUID=uid)
                
                adminDashboard = admin_dashboard.query.filter(admin_dashboard.uid==uid).first()
                
                if(adminDashboard):
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
        
@blue_util.route("/img/<uid>/<num>", methods=["POST"])
def img(uid, num):
    if(request.method == "POST"):
        try:
            adminImg = admin_img.query.filter(admin_img.uid==uid).all()
            if(adminImg):
                return adminImg[int(num)].img
            else:
                storyImg = story_img.query.filter(story_img.uid==uid).all()
                return storyImg[int(num)].img
        except:
           return jsonify({'result':False})
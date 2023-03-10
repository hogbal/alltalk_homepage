from flask import Blueprint, request, jsonify
from models import content_like_list, story_like_list, content_dashboard, story_dashboard, content_img, story_img, content_temporary_img, story_temporary_img, user_info, user_profile, db

blue_util = Blueprint("util", __name__, url_prefix="/util")

@blue_util.route("/admin", methods=["POST"])
def admin():
    if(request.method == "POST"):
        id = request.form.get("id",None)
        if(id):
            try:
                user = user_info.query.filter(user_info.id==id).first()
                
                if(user.admin):
                    return jsonify({'result':True})
                else:
                    return jsonify({'result':False})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})

@blue_util.route("/content/like", methods=["POST"])
def content_like():
    if(request.method == "POST"):
        id = request.form.get("id",None)
        idx = request.form.get("idx",None)
        
        if(id and idx):
            try:
                isLike = content_like_list.query.filter((content_like_list.content_idx==idx) & (content_like_list.id==id)).first()
                
                if(not isLike):
                    newLikeList = content_like_list(idx=None, content_idx=idx, id=id)
                    contentDashboard = content_dashboard.query.filter(content_dashboard.idx==idx).first()
                    contentDashboard.like = contentDashboard.like+1
                    
                    db.session.add(newLikeList)
                    db.session.commit()
                    return jsonify({'result':True})
                else:
                    return jsonify({'result':False})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})

@blue_util.route("/story/like", methods=["POST"])
def story_like():
    if(request.method == "POST"):
        id = request.form.get("id",None)
        idx = request.form.get("idx",None)
        
        if(id and idx):
            try:
                isLike = story_like_list.query.filter((story_like_list.story_idx==idx) & (story_like_list.id==id)).first()
                
                if(not isLike):
                    newLikeList = story_like_list(idx=None, story_idx=idx, id=id)
                    storyDashboard = story_dashboard.query.filter(story_dashboard.idx==idx).first()
                    storyDashboard.like = storyDashboard.like+1
                    
                    db.session.add(newLikeList)
                    db.session.commit()
                    return jsonify({'result':True})
                else:
                    return jsonify({'result':False})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})

@blue_util.route("/content/<idx>/<num>", methods=["POST"])
def content_get_img(idx, num):
    if(request.method == "POST"):
        try:
            contentImg = content_img.query.filter(content_img.content_idx==idx).all()
            return contentImg[int(num)].img
        except:
            return jsonify({'result':False})
       
@blue_util.route("/story/<idx>/<num>", methods=["POST"])
def story_get_img(idx, num):
    if(request.method == "POST"):
        try:
            storyImg = story_img.query.filter(story_img.story_idx==idx).all()
            return storyImg[int(num)].img
        except:
            return jsonify({'result':False})

@blue_util.route("/content/temp/<idx>/<num>", methods=["POST"])
def content_temp_get_img(idx, num):
    if(request.method == "POST"):
        try:
            contentImg = content_temporary_img.query.filter(content_temporary_img.content_idx==idx).all()
            return contentImg[int(num)].img
        except:
            return jsonify({'result':False})
       
@blue_util.route("/story/temp/<idx>/<num>", methods=["POST"])
def story_temp_get_img(idx, num):
    if(request.method == "POST"):
        try:
            storyImg = story_temporary_img.query.filter(story_temporary_img.story_idx==idx).all()
            return storyImg[int(num)].img
        except:
            return jsonify({'result':False})

@blue_util.route("/<id>/profile", methods=["POST"])
def profile(id):
    if(request.method == "POST"):
        try:
            profile = user_profile.query.filter(user_profile.id==id).first()
            if(profile.profile):
                return profile.profile
            else:
                return jsonify({'result':False})
        except:
            return jsonify({'result':False})
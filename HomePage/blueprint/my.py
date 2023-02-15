from flask import Blueprint, request, jsonify
from models import user_info, like_list, story_dashboard, db

blue_my = Blueprint("my", __name__, url_prefix="/my")

@blue_my.route("/", methods=["POST"], strict_slashes=False)
def my():
    if(request.method == "POST"):
        id = request.form.get("id",None)
        
        if(id):
            try:
                user = user_info.query.filter(user_info.id==id).first()
                likeList = like_list.query.filter(like_list.id==id).all()
                storyList = story_dashboard.query.filter(story_dashboard.id==id).all()
                
                data = {
                    "nickname":user.nickname,
                    "profile":user.profile,
                    "introduce":user.introduce,
                    "story":[],
                    "like":[]
                }
                
                for story in storyList:
                    storyData = {
                        "uid":story.uid,
                        "img":"test",
                        "title":story.title,
                        "day":story.day
                    }
                    data["story"].append(storyData)
                    
                for like in likeList:
                    likeData = {
                        "uid":like.dashboardUID
                    }
                    data["like"].append(likeData)
                
                return data
            except Exception as e:
                print(e)
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})
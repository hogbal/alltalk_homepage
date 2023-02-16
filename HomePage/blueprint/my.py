from flask import Blueprint, request, jsonify
from models import user_info, like_list, admin_dashboard, admin_img, story_dashboard, story_img, member_list, db

blue_my = Blueprint("my", __name__, url_prefix="/my")

@blue_my.route("/", methods=["POST"], strict_slashes=False)
def my():
    if(request.method == "POST"):
        id = request.form.get("id",None)
        
        if(id):
            try:
                isAdmin = user_info.query.filter(user_info.id==id).first().admin
                user = user_info.query.filter(user_info.id==id).first()
                likeList = like_list.query.filter(like_list.id==id).all()
                if(isAdmin):
                    dashboardList = admin_dashboard.query.filter(admin_dashboard.id==id).all()
                else:
                    dashboardList = story_dashboard.query.filter(story_dashboard.id==id).all()
                contentList = member_list.query.filter(member_list.id==id).all()
                
                data = {
                    "nickname":user.nickname,
                    "profile":user.profile,
                    "introduce":user.introduce,
                    "story":[],
                    "like":[],
                    "content":[]
                }
                
                for dashboard in dashboardList:
                    if(isAdmin):
                        storyImgLen = len(admin_img.query.filter(admin_img.uid==dashboard.uid).all())
                    else:
                        storyImgLen = len(story_img.query.filter(story_img.uid==dashboard.uid).all())
                    dashboardData = {
                        "uid":dashboard.uid,
                        "img":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/{dashboard.uid}/0" if(storyImgLen != 0) else None,
                        "title":dashboard.title,
                        "day":dashboard.day
                    }
                    
                    data["story"].append(dashboardData)
                    
                for like in likeList:
                    likeData = {
                        "uid":like.dashboardUID
                    }
                    data["like"].append(likeData)
                
                for content in contentList:
                    contentData = {
                    "uid":content.uid
                    }
                    data["content"].append(contentData)
                
                return data
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})

@blue_my.route("/update", methods=["POST"])
def update():
    if(request.method == "POST"):
        id = request.form.get("id", None)
        profile = request.files["profile"]
        introduce = request.form.get("introduce", None)
        name = request.form.get("name", None)
        phone = request.form.get("phone", None)
        email = request.form.get("email", None)
        nickname = request.form.get("nickname", None)
        sex = request.form.get("sex", None, type=lambda isSex: isSex.lower() == 'true')
        birthday = request.form.get("birthday", None)
        tag = request.form.get("tag", None)
        
        if(id and name and phone and email and nickname and sex != None and birthday and tag):
            try:
                user = user_info.query.filter(user_info.id==id).first()
                
                if(profile):
                    user.profile = profile.read()
                else:
                    user.profile = None
                user.introduce = introduce
                user.name = name
                user.phone = phone
                user.email = email
                user.nickname = nickname
                user.sex = sex
                user.birthday = birthday

                db.session.commit()
                
                return jsonify({'result':True})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})
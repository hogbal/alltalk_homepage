from flask import Blueprint, request, jsonify
from models import user_info, user_profile, content_like_list, story_like_list, content_dashboard, content_member_list, content_img, story_dashboard, story_img, db

blue_my = Blueprint("my", __name__, url_prefix="/my")

@blue_my.route("/admin", methods=["POST"])
def admin():
    if(request.method == "POST"):
        id = request.form.get("id",None)
        if(id):
            try:
                isAdmin = user_info.query.filter(user_info.id==id).first().admin
                
                if(isAdmin):
                    user = user_info.query.filter(user_info.id==id).first()
                    contentList = content_dashboard.query.filter(content_dashboard.id==id).all()
                    storyLikeList = story_like_list.query.filter(story_like_list.id==id).all()
                    contentLikeList = content_like_list.query.filter(content_like_list.id==id).all()
                    participationList = content_member_list.query.filter(content_member_list.id==id).all()
                    
                    data = {
                        "nickname":user.nickname,
                        "profile":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{user.id}/profile",
                        "introduce":user.introduce,
                        "story":[],
                        "storyLike":[],
                        "contentLike":[],
                        "participation":[]
                    }
                    
                    for content in contentList:
                        contentImgLen = len(content_img.query.filter(content_img.content_idx==content.idx).all())
                        contentData = {
                            "idx":content.idx,
                            "title":content.title,
                            "day":content.day,
                            "content":content.content,
                            "img":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{content.idx}/0" if(contentImgLen != 0) else None,
                            "url":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/content/{content.idx}",
                        }
                        data["story"].append(contentData)
                        
                    for storyLike in storyLikeList:
                        story = story_dashboard.query.filter(story_dashboard.idx==storyLike.story_idx).first()
                        storyImgLen = len(story_img.query.filter(story_img.story_idx==story.idx).all())
                        storyLikeData = {
                            "idx":storyLike.story_idx,
                            "title":story.title,
                            "day":story.day,
                            "content":story.content,
                            "img":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/story/{story.idx}/0" if(storyImgLen != 0) else None,
                            "url":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/story/{storyLike.story_idx}"
                        }
                        data["storyLike"].append(storyLikeData)
                        
                    for contentLike in contentLikeList:
                        content = content_dashboard.query.filter(content_dashboard.idx==contentLike.content_idx).first()
                        contentImgLen = len(content_img.query.filter(content_img.content_idx==content.idx).all())
                        contentLikeData = {
                            "idx":contentLike.content_idx,
                            "title":content.title,
                            "day":content.day,
                            "content":content.content,
                            "img":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{content.idx}/0" if(contentImgLen != 0) else None,
                            "url":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/content/{contentLike.content_idx}"
                        }
                        data["contentLike"].append(contentLikeData)
                        
                    for participation in participationList:
                        content = content_dashboard.query.filter(content_dashboard.idx==participation.content_idx).first()
                        contentImgLen = len(content_img.query.filter(content_img.content_idx==content.idx).all())
                        participationData = {
                            "idx":participation.content_idx,
                            "title":content.title,
                            "day":content.day,
                            "content":content.content,
                            "img":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{content.idx}/0" if(contentImgLen != 0) else None,
                            "url":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/content/{participation.content_idx}"
                        }
                        data["participation"].append(participationData)
                    
                    return data
                else:
                    return jsonify({'result':False})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})

@blue_my.route("/user", methods=["POST"])
def user():
    if(request.method == "POST"):
        id = request.form.get("id",None)
        if(id):
            try:
                isUser = not user_info.query.filter(user_info.id==id).first().admin
                
                if(isUser):
                    user = user_info.query.filter(user_info.id==id).first()
                    storyList = story_dashboard.query.filter(story_dashboard.id==id).all()
                    storyLikeList = story_like_list.query.filter(story_like_list.id==id).all()
                    contentLikeList = content_like_list.query.filter(content_like_list.id==id).all()
                    participationList = content_member_list.query.filter(content_member_list.id==id).all()
                    
                    data = {
                        "nickname":user.nickname,
                        "profile":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{user.id}/profile",
                        "introduce":user.introduce,
                        "story":[],
                        "storyLike":[],
                        "contentLike":[],
                        "participation":[]
                    }
                    
                    for story in storyList:
                        storyImgLen = len(story_img.query.filter(story_img.story_idx==story.idx).all())
                        storyData = {
                            "idx":story.idx,
                            "title":story.title,
                            "day":story.day,
                            "content":story.content,
                            "img":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/story/{story.idx}/0" if(storyImgLen != 0) else None,
                            "url":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/story/{story.idx}"
                        }
                        data["story"].append(storyData)
                        
                    for storyLike in storyLikeList:
                        story = story_dashboard.query.filter(story_dashboard.idx==storyLike.story_idx).first()
                        storyImgLen = len(story_img.query.filter(story_img.story_idx==story.idx).all())
                        storyLikeData = {
                            "idx":storyLike.story_idx,
                            "title":story.title,
                            "day":story.day,
                            "content":story.content,
                            "img":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/story/{story.idx}/0" if(storyImgLen != 0) else None,
                            "url":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/story/{storyLike.story_idx}"
                        }
                        data["storyLike"].append(storyLikeData)
                        
                    for contentLike in contentLikeList:
                        content = content_dashboard.query.filter(content_dashboard.idx==contentLike.content_idx).first()
                        contentImgLen = len(content_img.query.filter(content_img.content_idx==content.idx).all())
                        contentLikeData = {
                            "idx":contentLike.content_idx,
                            "title":content.title,
                            "day":content.day,
                            "content":content.content,
                            "img":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{content.idx}/0" if(contentImgLen != 0) else None,
                            "url":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/content/{contentLike.content_idx}"
                        }
                        data["contentLike"].append(contentLikeData)
                        
                    for participation in participationList:
                        content = content_dashboard.query.filter(content_dashboard.idx==participation.content_idx).first()
                        contentImgLen = len(content_img.query.filter(content_img.content_idx==content.idx).all())
                        participationData = {
                            "idx":participation.content_idx,
                            "title":content.title,
                            "day":content.day,
                            "content":content.content,
                            "img":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{content.idx}/0" if(contentImgLen != 0) else None,
                            "url":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/content/{participation.content_idx}"
                        }
                        data["participation"].append(participationData)
                    
                    return data
                else:
                    return jsonify({'result':False})
            except Exception as e:
                print(e)
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
                userProfile = user_profile.query.filter(user_profile.id==user.id).first()
                
                if(profile):
                    userProfile.profile = profile.read()
                else:
                    userProfile.profile = None
                user.introduce = introduce
                user.name = name
                user.phone = phone
                user.email = email
                user.nickname = nickname
                user.sex = sex
                user.birthday = birthday
                user.tag = tag

                db.session.commit()
                
                return jsonify({'result':True})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})
        
@blue_my.route("/password", methods=["POST"])
def password():
    if(request.method == "POST"):
        id = request.form.get("id", None)
        pw = request.form.get("pw", None)
        new_pw = request.form.get("newpw", None)
        
        if(id and pw and new_pw):
            try:
                user = user_info.query.filter((user_info.id==id) & (user_info.pw==pw)).first()
                
                if(user):
                    user.pw = new_pw
                    db.session.commit()
                    return jsonify({'result':True})
                else:
                    return jsonify({'result':False})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})
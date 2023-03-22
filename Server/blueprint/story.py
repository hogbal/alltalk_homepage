from flask import Blueprint, request, jsonify
from models import story_dashboard, story_img, story_tag_list, story_like_list, user_info, user_profile, db

blue_story = Blueprint("story", __name__, url_prefix="/story")

@blue_story.route("/<idx>", methods=["POST"])
def story(idx):
    if(request.method == "POST"):
        id = request.form.get("id",None)
        
        try:
            story = story_dashboard.query.filter(story_dashboard.idx==idx).first()
            preStory = story_dashboard.query.filter(story_dashboard.idx < story.idx).order_by(story_dashboard.idx.desc()).limit(1).first()
            nextStory = story_dashboard.query.filter(story_dashboard.idx > story.idx).order_by(story_dashboard.idx).limit(1).first()
            imgList = story_img.query.filter(story_img.story_idx==story.idx).all()
            user = user_info.query.filter(user_info.id==story.id).first()
            profile = user_profile.query.filter(user_profile.id==user.id).first()

            if(id):
                isLike = story_like_list.query.filter((story_like_list.story_idx==story.idx) & (story_like_list.id==id)).first()
            else:
                isLike = False
            
            data = {
                'story':{
                    'idx':story.idx,
                    'id':story.id,
                    'title':story.title,
                    'subtitle':story.subtitle,
                    'content':story.content,
                    'tag':story.tag,
                    'day':story.day,
                    'islike': True if(isLike) else False
                },
                'user':{
                    'nickname':user.nickname,
                    'profile': f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/{user.id}/profile" if(profile.profile) else None,
                    'introduce':user.introduce
                },
                'img':[]
            }
            
            for num, img in enumerate(imgList):
                url = f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/story/{img.story_idx}/{num}"
                data['img'].append(url)
            
            if(nextStory):
                lenNextStory = len(story_img.query.filter(story_img.story_idx==nextStory.idx).all())
                nextData = {
                    'idx':nextStory.idx,
                    'title':nextStory.title,
                    'day':nextStory.day,
                    'img':None
                }
                if(lenNextStory != 0):
                    nextData['img'] = f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/story/{nextStory.idx}/0"
                data['nextStory'] = nextData
            
            if(preStory):
                lenPreStory = len(story_img.query.filter(story_img.story_idx==preStory.idx).all())
                preData = {
                    'idx':preStory.idx,
                    'title':preStory.title,
                    'day':preStory.day,
                    'img':None
                }
                if(lenPreStory != 0):
                    preData['img'] = f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/story/{preStory.idx}/0"
                data['preStory'] = preData
            
            return data
        except:
            return jsonify({'result':False})

@blue_story.route("/list/<tag>", methods=["POST"])
def story_list(tag):
    if(request.method == "POST"):
        id = request.form.get("id",None)
        start = request.form.get("start",None,type=int)
        end = request.form.get("end",None,type=int)
        
        if(id and start != None and end != None):
            if(tag == 'all'):
                try:
                    storyList = story_dashboard.query.filter().order_by(story_dashboard.idx.desc()).all()[start:end]

                    data = []
                    
                    for story in storyList:
                        storyImgLen = len(story_img.query.filter(story_img.story_idx==story.idx).all())
                        user = user_info.query.filter(user_info.id==story.id).first()
                        profile = user_profile.query.filter(user_profile.id==user.id).first()
                        isLike = story_like_list.query.filter((story_like_list.story_idx==story.idx) & (story_like_list.id==id)).first()
                        storyData = {
                                "idx":story.idx,
                                "nickname":user.nickname,
                                "profile": f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/{user.id}/profile" if(profile.profile) else None,
                                "img":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/story/{story.idx}/0" if(storyImgLen != 0) else None,
                                "tag":story.tag,
                                "title":story.title,
                                "subtitle":story.subtitle,
                                "like":story.like,
                                "day":story.day,
                                "islike": True if(isLike) else False
                            }
                        data.append(storyData)
                    return data
                except:
                    return jsonify({'result':False})
            else:
                try:
                    storyTagList = story_tag_list.query.filter(story_tag_list.tag==tag).order_by(story_tag_list.idx.desc()).all()[start:end]
                    
                    data = []
                    
                    for storyTag in storyTagList:
                        story = story_dashboard.query.filter(story_dashboard.idx==storyTag.story_idx).first()
                        if(story):
                            storyImgLen = len(story_img.query.filter(story_img.story_idx==story.idx).all())
                            user = user_info.query.filter(user_info.id==story.id).first()
                            profile = user_profile.query.filter(user_profile.id==user.id).first()
                            isLike = story_like_list.query.filter((story_like_list.story_idx==story.idx) & (story_like_list.id==id)).first()
                            storyData = {
                                "idx":story.idx,
                                "nickname":user.nickname,
                                "profile": f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/{user.id}/profile" if(profile.profile) else None,
                                "img":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/story/{story.idx}/0" if(storyImgLen != 0) else None,
                                "tag":story.tag,
                                "title":story.title,
                                "subtitle":story.subtitle,
                                "like":story.like,
                                "day":story.day,
                                "islike": True if(isLike) else False
                            }
                            data.append(storyData)
                        
                    return data
                except:
                    return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})
        
@blue_story.route("/delete", methods=["POST"])
def delete():
    if(request.method == "POST"):
        idx = request.form.get("idx", None)
        
        if(idx):
            try:
                story = story_dashboard.query.filter(story_dashboard.idx == idx).first()
                storyImgs = story_img.query.filter(story_img.story_idx == idx).all()
                likeList = story_like_list.query.filter(story_like_list.story_idx == idx).all()
                tagList = story_tag_list.query.filter(story_tag_list.story_idx == idx).all()
                
                for storyImg in storyImgs:
                    db.session.delete(storyImg)
                    db.session.commit()
                    
                for likeStory in likeList:
                    db.session.delete(likeStory)
                    db.session.commit()
                    
                for tagStory in tagList:
                    db.session.delete(tagStory)
                    db.session.commit()
                    
                db.session.delete(story)
                db.session.commit()
                
                return jsonify({'result':True})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})
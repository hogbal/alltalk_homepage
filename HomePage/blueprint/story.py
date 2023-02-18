from flask import Blueprint, request, jsonify
from models import story_dashboard, story_img, story_tag_list, story_like_list, user_info

blue_story = Blueprint("story", __name__, url_prefix="/story")

@blue_story.route("/<idx>", methods=["POST"])
def story(idx):
    if(request.method == "POST"):
        try:
            story = story_dashboard.query.filter(story_dashboard.idx==idx).first()
            storyList = story_dashboard.query.all()
            imgList = story_img.query.filter(story_img.story_idx==story.idx).all()
            user = user_info.query.filter(user_info.id==story.id).first()

            storyList = story_dashboard.query.filter().all()
            
            data = {
                'story':{
                    'idx':story.idx,
                    'title':story.title,
                    'subtitle':story.subtitle,
                    'content':story.content,
                    'tag':story.tag,
                    'day':story.day
                },
                'user':{
                    'nickname':user.nickname,
                    'profile':f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{user.id}/profile",
                    'introduce':user.introduce
                },
                'img':[]
            }
            
            for num, img in enumerate(imgList):
                url = f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/story/{img.story_idx}/{num}"
                data['img'].append(url)
                
            return data
        except:
            return jsonify({'result':False})

@blue_story.route("/list/<tag>", methods=["POST"])
def story_list(tag):
    if(request.method == "POST"):
        id = request.form.get("id",None)
        
        if(id):
            if(tag == 'all'):
                try:
                    storyList = story_dashboard.query.filter().all()

                    data = []
                    
                    for story in storyList:
                        storyImgLen = len(story_img.query.filter(story_img.story_idx==story_img.idx).all())
                        user = user_info.query.filter(user_info.id==story.id).first()
                        isLike = story_like_list.query.filter((story_like_list.story_idx==story.idx) & (story_like_list.id==id)).first()
                        storyData = {
                                "idx":story.idx,
                                "nickname":user.nickname,
                                "profile":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{user.id}/profile",
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
                    storyTagList = story_tag_list.query.filter(story_tag_list.tag==tag).all()
                    
                    data = []
                    
                    for storyTag in storyTagList:
                        story = story_dashboard.query.filter(story_dashboard.idx==storyTag.story_idx).first()
                        if(story):
                            storyImgLen = len(story_img.query.filter(story_img.story_idx==story.idx).all())
                            user = user_info.query.filter(user_info.id==story.id).first()
                            isLike = story_like_list.query.filter((story_like_list.story_idx==story.idx) & (story_like_list.id==id)).first()
                            storyData = {
                                "idx":story.idx,
                                "nickname":user.nickname,
                                "profile":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{user.id}/profile",
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
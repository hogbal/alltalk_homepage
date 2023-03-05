import datetime
from flask import Blueprint, request, jsonify
from models import user_info, content_dashboard, content_img, content_tag_list, story_dashboard, story_img, story_tag_list, content_temporary_storage, content_temporary_img, story_temporary_storage, story_temporary_img, db

blue_write = Blueprint("write", __name__, url_prefix="/write")

@blue_write.route("/content", methods=["POST"])
def content():
    if(request.method == "POST"):
        id = request.form.get("id", None)
        title = request.form.get("title", None)
        subtitle = request.form.get("subtitle", None)
        content = request.form.get("content", None)
        imgs = request.files.getlist("file[]")
        tags = request.form.get("tag", None)
        maxMember = request.form.get("maxMember", None)
        deadline = request.form.get("deadline", None)
        
        print(imgs)
        
        if(id and title and content and tags and maxMember and deadline):
            try:
                isAdmin = user_info.query.filter(user_info.id==id).first().admin
                
                if(isAdmin):
                    now = datetime.datetime.now()
                    deadline = datetime.datetime.fromtimestamp(int(deadline))
                    
                    newContent = content_dashboard(idx=None, id=id, title=title, subtitle=subtitle, content=content, tag=tags, day=now, maxMember=maxMember, deadline=deadline, member=0, like=0)
                    
                    db.session.add(newContent)
                    db.session.commit()
                    
                    if(imgs):
                        for img in imgs:
                            newContentImg = content_img(idx=None, content_idx=newContent.idx,img=img.read())
                            db.session.add(newContentImg)
                        db.session.commit()
                    
                    tags = tags.split(',')
                    for tag in tags:
                        newContentTag = content_tag_list(idx=None, content_idx=newContent.idx, tag=tag)
                        db.session.add(newContentTag)
                    db.session.commit()
                    
                    return jsonify({'result':True})
                else:
                    return jsonify({'result':False})
            except Exception as e:
                print(e)
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})
            
@blue_write.route("/story", methods=["POST"])
def story():
    if(request.method == "POST"):
        id = request.form.get("id", None)
        title = request.form.get("title", None)
        subtitle = request.form.get("subtitle", None)
        content = request.form.get("content", None)
        imgs = request.files.getlist("file[]")
        tags = request.form.get("tag", None)
        
        if(id and title and content and tags):
            try:
                isUser = not user_info.query.filter(user_info.id==id).first().admin
                
                if(isUser):
                    now = datetime.datetime.now()
                    
                    newStory = story_dashboard(idx=None, id=id, title=title, subtitle=subtitle, content=content, tag=tags, day=now, like=0)
                    
                    db.session.add(newStory)
                    db.session.commit()
                    
                    if(imgs):
                        for img in imgs:
                            newContentImg = story_img(idx=None, story_idx=newStory.idx,img=img.read())
                            db.session.add(newContentImg)
                        db.session.commit()
                    
                    tags = tags.split(',')
                    for tag in tags:
                        newStoryTag = story_tag_list(idx=None, story_idx=newStory.idx, tag=tag)
                        db.session.add(newStoryTag)
                    db.session.commit()
                    
                    return jsonify({'result':True})
                else:
                    return jsonify({'result':False})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})

@blue_write.route("/content/temp",methods=["POST"])
def content_temp():
    if(request.method == "POST"):
        id = request.form.get("id",None)
        title = request.form.get("title",None)
        subtitle = request.form.get("subtitle",None)
        content = request.form.get("content",None)
        imgs = request.files.getlist("file[]")
        tags = request.form.get("tag",None)
        maxMember = request.form.get("maxMember", None)
        deadline = request.form.get("deadline", None)
        
        if(id and title):
            try:
                isAdmin = user_info.query.filter(user_info.id==id).first().admin
                
                if(isAdmin):
                    now = datetime.datetime.now()
                    if(deadline):
                        deadline = datetime.datetime.fromtimestamp(int(deadline))
                    
                    newContent = content_temporary_storage(idx=None, id=id, title=title, subtitle=subtitle, content=content, tag=tags, day=now, maxMember=maxMember, deadline=deadline)
                    
                    db.session.add(newContent)
                    db.session.commit()
                    
                    if(imgs):
                        for img in imgs:
                            newContentImg = content_temporary_img(idx=None, content_idx=newContent.idx,img=img.read())
                            db.session.add(newContentImg)
                        db.session.commit()
                    
                    return jsonify({'result':True})
                else:
                    return jsonify({'result':False})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})

@blue_write.route("/story/temp",methods=["POST"])
def story_temp():
    if(request.method == "POST"):
        id = request.form.get("id",None)
        title = request.form.get("title",None)
        subtitle = request.form.get("subtitle",None)
        content = request.form.get("content",None)
        imgs = request.files.getlist("file[]")
        tags = request.form.get("tag",None)
        
        if(id and title):
            try:
                isUser = not user_info.query.filter(user_info.id==id).first().admin
                
                if(isUser):
                    now = datetime.datetime.now()
                    
                    newStory = story_temporary_storage(idx=None, id=id, title=title, subtitle=subtitle, content=content, tag=tags, day=now)
                    
                    db.session.add(newStory)
                    db.session.commit()
                    
                    if(imgs):
                        for img in imgs:
                            newStoryImg = story_temporary_img(idx=None, story_idx=newStory.idx,img=img.read())
                            db.session.add(newStoryImg)
                        db.session.commit()
                    
                    return jsonify({'result':True})
                else:
                    return jsonify({'result':False})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})

@blue_write.route("/content/temp/list",methods=["POST"])
def content_temp_list():
    if(request.method == "POST"):
        id = request.form.get("id","")
        if(id):
            try:
                isAdmin = user_info.query.filter(user_info.id==id).first().admin
                
                if(isAdmin):
                    contentTempList = content_temporary_storage.query.filter(content_temporary_storage.id==id).all()
                        
                    data = []
                    
                    for content in contentTempList:
                        contentTempImgLen = len(content_temporary_img.query.filter(content_temporary_img.content_idx==content.idx).all())
                        contentData = {
                            "idx":content.idx,
                            "img":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{content.idx}/0" if(contentTempImgLen != 0) else None,
                            "title":content.title,
                            "day":content.day
                        }
                        data.append(contentData)
                    
                    return data  
                else:
                    return jsonify({'result':False})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})

@blue_write.route("/story/temp/list",methods=["POST"])
def story_temp_list():
    if(request.method == "POST"):
        id = request.form.get("id","")
        if(id):
            try:
                isUser = not user_info.query.filter(user_info.id==id).first().admin
                
                if(isUser):
                    storyTempList = story_temporary_storage.query.filter(story_temporary_storage.id==id).all()
                        
                    data = []
                    
                    for story in storyTempList:
                        storyTempImgLen = len(story_temporary_img.query.filter(story_temporary_img.story_idx==story.idx).all())
                        storyData = {
                            "idx":story.idx,
                            "img":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/story/{story.idx}/0" if(storyTempImgLen != 0) else None,
                            "title":story.title,
                            "day":story.day
                        }
                        data.append(storyData)
                    
                    return data
                else:
                    return jsonify({'result':False})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})


@blue_write.route("/content/temp/load",methods=["POST"])
def content_temp_load():
    if(request.method == "POST"):
        idx = request.form.get("idx",None)
        
        if(idx):
            try:
                contentTemp = content_temporary_storage.query.filter(content_temporary_storage.idx==idx).first()
                data = {
                    "title":contentTemp.title,
                    "subtitle":contentTemp.subtitle,
                    "content":contentTemp.content,
                    "tag":contentTemp.tag,
                    "day":contentTemp.day,
                    "maxMember":contentTemp.maxMember,
                    "deadline":contentTemp.deadline
                }
                return data
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})
        
@blue_write.route("/story/temp/load",methods=["POST"])
def story_temp_load():
    if(request.method == "POST"):
        idx = request.form.get("idx",None)
        
        if(idx):
            try:
                storyTemp = story_temporary_storage.query.filter(story_temporary_storage.idx==idx).first()
                data = {
                    "title":storyTemp.title,
                    "subtitle":storyTemp.subtitle,
                    "content":storyTemp.content,
                    "tag":storyTemp.tag,
                    "day":storyTemp.day
                }
                return data
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})        
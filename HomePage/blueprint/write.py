import uuid
import datetime
from flask import Blueprint, request, jsonify
from models import user_info, admin_dashboard, story_dashboard, admin_img, story_img, admin_temporary_storage, admin_temporary_img, temporary_storage, temporary_img, db

blue_write = Blueprint("write", __name__, url_prefix="/write")

@blue_write.route("/", methods=["POST"], strict_slashes=False)
def write():
    if(request.method == "POST"):
        id = request.form.get("id", None)
        title = request.form.get("title", None)
        subtitle = request.form.get("subtitle", None)
        content = request.form.get("content", None)
        imgs = request.files.getlist("file[]")
        tag = request.form.get("tag", None)
        maxMember = request.form.get("maxMember", None)
        deadline = request.form.get("deadline", None)

        if(id and title and content and tag):
            try:
                isAdmin = user_info.query.filter(user_info.id==id).first().admin
                
                uid = str(uuid.uuid4())
                now = datetime.datetime.now()
                if(isAdmin):
                    deadline = datetime.datetime.fromtimestamp(int(deadline))
                    newDashboard = admin_dashboard(uid=uid, id=id, title=title, subtitle=subtitle, content=content, tag=tag, day=now, maxMember=maxMember, deadline=deadline, member=0, like=0)
                else:
                    newDashboard = story_dashboard(uid=uid, id=id, title=title, subtitle=subtitle, content=content, tag=tag, day=now, like=0)
                    
                db.session.add(newDashboard)
                    
                if(imgs):
                    if(isAdmin):
                        for img in imgs:
                            newAdminImg = admin_img(idx=None, uid=uid,img=img.read())
                            db.session.add(newAdminImg)
                    else:
                        for img in imgs:
                            newStoryImg = story_img(idx=None, uid=uid,img=img.read())
                            db.session.add(newStoryImg)
                db.session.commit()
                
                return jsonify({'result':True})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})


@blue_write.route("/temp",methods=["POST"])
def temp():
    if(request.method == "POST"):
        id = request.form.get("id","")
        title = request.form.get("title","")
        subtitle = request.form.get("subtitle","")
        content = request.form.get("content","")
        imgs = request.files.getlist("file[]")
        tag = request.form.get("tag","")
        maxMember = request.form.get("maxMember", None)
        deadline = request.form.get("deadline", None)
        
        if(id):
            try:
                isAdmin = user_info.query.filter(user_info.id==id).first().admin
                
                uid = str(uuid.uuid4())
                now = datetime.datetime.now()
                if(isAdmin):
                    if(deadline):
                        deadline = datetime.datetime.fromtimestamp(int(deadline))
                    newTemporaryStorage = admin_temporary_storage(uid=uid, id=id, title=title, subtitle=subtitle, content=content, tag=tag, day=now, maxMember=maxMember, deadline=deadline)
                else:
                    newTemporaryStorage = temporary_storage(uid=uid, id=id, title=title, subtitle=subtitle, content=content, tag=tag, day=now)
                db.session.add(newTemporaryStorage)
                db.session.commit()
                
                if(imgs):
                    if(isAdmin):
                        for img in imgs:
                            newAdminTemporaryImg = admin_temporary_img(idx=None, uid=uid ,img=img.read())
                            db.session.add(newAdminTemporaryImg)
                    else:
                        for img in imgs:
                            TemporaryImg = temporary_img(idx=None, uid=uid,img=img.read())
                            db.session.add(TemporaryImg)
                            
                    db.session.commit()
                return jsonify({'result':True})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})
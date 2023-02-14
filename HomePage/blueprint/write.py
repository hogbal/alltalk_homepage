import uuid
import datetime
from flask import Blueprint, request, jsonify
from models import adminDashboard, storyDashboard, adminImg

blue_write = Blueprint("write", __name__, url_prefix="/write")

@blue_write.route("/", methods=["POST"])
def write():
    if(request.method == "POST"):
        id = request.form.get("id","")
        title = request.form.get("title","")
        subtitle = request.form.get("subtitle","")
        content = request.form.get("content","")
        imgs = request.files.getlist("file[]")
        tag = request.form.get("tag","")
        admin = request.form.get("admin",False, type=bool)
        maxMember = request.form.get("maxMember","")
        deadline = request.form.get("deadline","")
        
        if(admin):
            if(id != "" and title != "" and content != "" and tags != "" and maxMember != "", deadline != ""):
                try:
                    now = datetime.datetime.now()
                    
                    newAdminDashboadr = adminDashboard(uid=uuid.uuid4(), id=id, title=title, subtitle=subtitle, content=content, tag=tag, day=now, maxMember=maxMember, deadline=deadline, member=0, like=0)
                    
                    db.session.add(newAdminDashboadr)
                    db.session.commit()
                    
                    return jsonify({'result':True})
                except:
                    return jsonify({'result':False})
            else:
                return jsonify({'result':'error'})
        else:
            if(id != "" and title != "" and content != "" and tags != ""):
                try:
                    now = datetime.datetime.now()
                    
                    newStoryDashboadr = storyDashboard(uid=uuid.uuid4(), id=id, title=title, subtitle=subtitle, content=content, tag=tag, day=now, like=0)
                    
                    db.session.add(newStoryDashboadr)
                    db.session.commit()
                    
                    return jsonify({'result':True})
                except:
                    return jsonify({'result':False})

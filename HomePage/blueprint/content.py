from flask import Blueprint, request, jsonify
from models import content_dashboard, content_temporary_storage, content_member_list, db

blue_content = Blueprint("content", __name__, url_prefix="/content")

@blue_content.route("/<idx>", methods=["POST"])
def story(idx):
    if(request.method == "POST"):
        try:
            dashboard = content_dashboard.query.filter(content_dashboard.idx==idx).first()
            if(dashboard):
                idx = dashboard.idx
                dashboardList = content_dashboard.query.filter().all()
                
                
            return jsonify({'result':True})
        except:
            return jsonify({'result':False})

@blue_content.route("/participation", methods=["POST"])
def participation():
    if(request.method == "POST"):
        id = request.form.get("id", None)
        idx = request.form.get("idx", None)
        
        if(id and idx):
            try:
                newContentMemberList = content_member_list(idx=None, content_idx=idx, id=id)
                
                db.session.add(newContentMemberList)
                db.session.commit()
                return jsonify({'result':True})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})
from flask import Blueprint, request, jsonify
from models import adminDashboard, adminImg

blue_main = Blueprint("main", __name__, url_prefix="/main")

@blue_main.route("/content", methods=["POST"])
def content():
    if(request.method == "POST"):
        contents = adminDashboard.query\
            .join(adminImg, adminDashboard.uid==adminImg.uid, isouter=True)\
            .add_columns(adminImg.img)\
            .order_by(adminDashboard.uid)\
            .all()
        
        for i in contents:
            print(i.img)
        
        return "test"
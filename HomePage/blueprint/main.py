from flask import Blueprint, request, jsonify
from models import story_dashboard

blue_main = Blueprint("main", __name__, url_prefix="/main")

# @blue_main.route("/content", methods=["POST"])
# def content():
#     if(request.method == "POST"):
#         contents = admin_dashboard.query\
#             .join(admin_img, admin_dashboard.uid==admin_img.uid, isouter=True)\
#             .add_columns(admin_img.img)\
#             .order_by(admin_dashboard.uid)\
#             .all()
        
#         data = [
            
#         ]
        
#         for i in contents:
#             print(i)
        
#         return "test"
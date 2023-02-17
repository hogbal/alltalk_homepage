import datetime
from flask import Blueprint, request, jsonify
from models import content_dashboard, content_img, content_tag_list

blue_main = Blueprint("main", __name__, url_prefix="/main")

@blue_main.route("/content/recruit/<tag>", methods=["POST"])
def recruit(tag):
    if(request.method == "POST"):
        if(tag == 'all'):
            contentList = content_dashboard.query.filter(content_dashboard.deadline >= datetime.datetime.now()).all()
            
            data = []
            
            for content in contentList:
                contentImgLen = len(content_img.query.filter(content_img.content_idx==content.idx).all())
                contentData = {
                        "idx":content.idx,
                        "img":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{content.idx}/0" if(contentImgLen != 0) else None,
                        "title":content.title,
                        "day":content.day
                    }
                data.append(contentData)
            return data
        else:
            contentTagList = content_tag_list.query.filter(content_tag_list.tag==tag).all()
            
            data = []
            
            for contentTag in contentTagList:
                content = content_dashboard.query.filter((content_dashboard.idx==contentTag.content_idx) & (content_dashboard.deadline >= datetime.datetime.now())).first()
                if(content):
                    contentImgLen = len(content_img.query.filter(content_img.content_idx==content.idx).all())
                    contentData = {
                        "idx":content.idx,
                        "img":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{content.idx}/0" if(contentImgLen != 0) else None,
                        "title":content.title,
                        "day":content.day
                    }
                    data.append(contentData)
                
            return data
        
@blue_main.route("/content/end/<tag>", methods=["POST"])
def end(tag):
    if(request.method == "POST"):
        if(tag == 'all'):
            contentList = content_dashboard.query.filter(content_dashboard.deadline < datetime.datetime.now()).all()
            
            data = []
            
            for content in contentList:
                contentImgLen = len(content_img.query.filter(content_img.content_idx==content.idx).all())
                contentData = {
                        "idx":content.idx,
                        "img":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{content.idx}/0" if(contentImgLen != 0) else None,
                        "title":content.title,
                        "day":content.day
                    }
                data.append(contentData)
            return data
        else:
            contentTagList = content_tag_list.query.filter(content_tag_list.tag==tag).all()
            
            data = []
            
            for contentTag in contentTagList:
                content = content_dashboard.query.filter((content_dashboard.idx==contentTag.content_idx) & (content_dashboard.deadline < datetime.datetime.now())).first()
                if(content):
                    contentImgLen = len(content_img.query.filter(content_img.content_idx==content.idx).all())
                    contentData = {
                        "idx":content.idx,
                        "img":f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{content.idx}/0" if(contentImgLen != 0) else None,
                        "title":content.title,
                        "day":content.day
                    }
                    data.append(contentData)
                
            return data
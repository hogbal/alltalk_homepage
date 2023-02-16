from flask import Blueprint, request, jsonify
from models import user_info, content_dashboard, content_img, content_member_list, db

blue_content = Blueprint("content", __name__, url_prefix="/content")

@blue_content.route("/<idx>", methods=["POST"])
def story(idx):
    if(request.method == "POST"):
        try:
            content = content_dashboard.query.filter(content_dashboard.idx==idx).first()
            contentList = content_dashboard.query.all()
            imgList = content_img.query.filter(content_img.content_idx==content.idx).all()
            user = user_info.query.filter(user_info.id==content.id).first()

            contentList = content_dashboard.query.filter().all()
            
            data = {
                'content':{
                    'idx':content.idx,
                    'title':content.title,
                    'subtitle':content.subtitle,
                    'content':content.content,
                    'tag':content.tag,
                    'day':content.day,
                    'member':content.member,
                    'maxMember':content.maxMember,
                    'deadline':content.deadline
                },
                'user':{
                    'nickname':user.nickname,
                    'profile':user.profile,
                    'introduce':user.introduce
                },
                'img':[]
            }
            
            for num, img in enumerate(imgList):
                url = f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{img.content_idx}/{num}"
                data['img'].append(url)
            
            if(content.idx - 1 > 0):
                lenPreContent = len(content_img.query.filter(content_img.content_idx==content.idx-1).all())
                preData = {
                    'idx':content.idx-1,
                    'title':contentList[content.idx-1].title,
                    'day':contentList[content.idx-1].day,
                    'img':None
                }
                if(lenPreContent != 0):
                    preData['img'] = f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{content.idx-1}/0"
                data['preContent'] = preData
            
            if(content.idx < len(contentList)):
                lenNextContent = len(content_img.query.filter(content_img.content_idx==content.idx+1).all())
                nextData = {
                    'idx':content.idx+1,
                    'title':contentList[content.idx-1].title,
                    'day':contentList[content.idx-1].day,
                    'img':None
                }
                if(lenNextContent != 0):
                    nextData['img'] = f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{content.idx+1}/0"
                data['nextContent'] = nextData
                
            return data
        except Exception as e:
            print(e)
            return jsonify({'result':False})

@blue_content.route("/participation", methods=["POST"])
def participation():
    if(request.method == "POST"):
        id = request.form.get("id", None)
        idx = request.form.get("idx", None)
        
        if(id and idx):
            try:
                isParticipation = content_member_list.query.filter((content_member_list.content_idx==idx) & (content_member_list.id==id)).first()
                if(not isParticipation):
                    newContentMemberList = content_member_list(idx=None, content_idx=idx, id=id)
                    content = content_dashboard.query.filter(content_dashboard.idx == idx).first()
                    if(content.maxMember < content.member + 1):
                        return jsonify({'result':'exceed'})
                    else:
                        content.member = content.member + 1
                    
                    db.session.add(newContentMemberList)
                    db.session.commit()
                    return jsonify({'result':True})
                else:
                    return jsonify({'result':False})
            except:
                return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})
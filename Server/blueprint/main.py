from flask import Blueprint, request, jsonify
from models import content_dashboard, content_img, content_tag_list, content_member_list

blue_main = Blueprint("main", __name__, url_prefix="/main")

@blue_main.route("/content/<tag>", methods=["POST"])
def recruit(tag):
    if(request.method == "POST"):
        id = request.form.get("id", None)
        start = request.form.get("start",None,type=int)
        end = request.form.get("end",None,type=int)

        if(start != None and end != None):
            if(tag == 'all'):
                try:
                    contentList = content_dashboard.query.filter().order_by(content_dashboard.idx.desc()).all()[start:end]
                    
                    data = []
                    
                    for content in contentList:
                        preContent = content_dashboard.query.filter(content_dashboard.idx < content.idx).order_by(content_dashboard.idx.desc()).limit(1).first()
                        nextContent = content_dashboard.query.filter(content_dashboard.idx > content.idx).order_by(content_dashboard.idx).limit(1).first()
                        
                        contentData = {
                            'idx':content.idx,
                            'title':content.title,
                            'subtitle':content.subtitle,
                            'content':content.content,
                            'tag':content.tag,
                            'day':content.day,
                            'member':content.member,
                            'maxMember':content.maxMember,
                            'deadline':content.deadline,
                            'img':[],
                            'like':content.like,
                            'participation': False
                        }
                        
                        imgList = content_img.query.filter(content_img.content_idx==content.idx).all()
                    
                        for num, img in enumerate(imgList):
                            url = f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{img.content_idx}/{num}"
                            contentData['img'].append(url)
                        
                        if(nextContent):
                            lenNextContent = len(content_img.query.filter(content_img.content_idx==nextContent.idx).all())
                            nextData = {
                                'idx':nextContent.idx,
                                'title':nextContent.title,
                                'day':nextContent.day,
                                'img':None
                            }
                            if(lenNextContent != 0):
                                nextData['img'] = f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{nextContent.idx}/0"
                            contentData['nextContent'] = nextData
                        
                        if(preContent):
                            lenPreContent = len(content_img.query.filter(content_img.content_idx==preContent.idx).all())
                            preData = {
                                'idx':preContent.idx,
                                'title':preContent.title,
                                'day':preContent.day,
                                'img':None
                            }
                            if(lenPreContent != 0):
                                preData['img'] = f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{preContent.idx}/0"
                            contentData['preContent'] = preData
                        
                        if(id):
                            contentMember = content_member_list.query.filter((content_member_list.content_idx == content.idx) & (content_member_list.id == id)).first()
                            if(contentMember):
                                contentData['participation'] = True
                        
                        data.append(contentData)
                    
                    return data
                except:
                    return jsonify({'result':False})
            else:
                try:
                    contentTagList = content_tag_list.query.filter(content_tag_list.tag==tag).order_by(content_tag_list.idx.desc()).all()[start:end]
                    
                    data = []
                    
                    for contentTag in contentTagList:
                        content = content_dashboard.query.filter(content_dashboard.idx==contentTag.content_idx).first()
                        preContent = content_dashboard.query.filter(content_dashboard.idx < content.idx).order_by(content_dashboard.idx.desc()).limit(1).first()
                        nextContent = content_dashboard.query.filter(content_dashboard.idx > content.idx).order_by(content_dashboard.idx).limit(1).first()
                            
                        contentData = {
                            'idx':content.idx,
                            'title':content.title,
                            'subtitle':content.subtitle,
                            'content':content.content,
                            'tag':content.tag,
                            'day':content.day,
                            'member':content.member,
                            'maxMember':content.maxMember,
                            'deadline':content.deadline,
                            'img':[],
                            'like':content.like,
                            'participation': False
                        }
                            
                        imgList = content_img.query.filter(content_img.content_idx==content.idx).all()
                    
                        for num, img in enumerate(imgList):
                            url = f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{img.content_idx}/{num}"
                            contentData['img'].append(url)
                        
                        if(nextContent):
                            lenNextContent = len(content_img.query.filter(content_img.content_idx==nextContent.idx).all())
                            nextData = {
                                'idx':nextContent.idx,
                                'title':nextContent.title,
                                'day':nextContent.day,
                                'img':None
                            }
                            if(lenNextContent != 0):
                                nextData['img'] = f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{nextContent.idx}/0"
                            contentData['nextContent'] = nextData
                        
                        if(preContent):
                            lenPreContent = len(content_img.query.filter(content_img.content_idx==preContent.idx).all())
                            preData = {
                                'idx':preContent.idx,
                                'title':preContent.title,
                                'day':preContent.day,
                                'img':None
                            }
                            if(lenPreContent != 0):
                                preData['img'] = f"http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/content/{preContent.idx}/0"
                            contentData['preContent'] = preData
                            
                        if(id):
                            contentMember = content_member_list.query.filter((content_member_list.content_idx == content.idx) & (content_member_list.id == id)).first()
                            if(contentMember):
                                contentData['participation'] = True
                        
                        data.append(contentData)
                        
                    return data
                except:
                    return jsonify({'result':False})
        else:
            return jsonify({'result':'error'})
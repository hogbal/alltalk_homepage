import requests

url = "http://localhost:5000/signin"
# url = "http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/signin"

data = {
    "id":"test",
    "pw":"1",
    "name":"test",
    "phone":"test",
    "email":"test",
    "nickname":"test",
    "sex":True,
    "birthday":"19990618",
    "tag":"['tag1','tag2','tag3']",
    "profile":None,
    "admin":True
}

res = requests.post(url,data=data)
print(res.text)
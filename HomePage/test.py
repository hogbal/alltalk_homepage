import requests

url = "http://localhost:5000/main/content"

data = {
    
}

res = requests.post(url,data=data)
print(res.text)
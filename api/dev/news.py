# -*- coding:UTF-8 -*-
#!/usr/local/python35/bin/python3

import requests
from bs4 import BeautifulSoup

url = "https://www.bishijie.com/kuaixun/"

req = requests.get(url)
req.encoding = 'utf-8'
content = req.text
soup = BeautifulSoup(content,'html.parser')
chapter = soup.find_all(name='div',class_="2019-08-06")

print(soup.prettify())

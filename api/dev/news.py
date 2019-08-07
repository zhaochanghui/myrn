# -*- coding:UTF-8 -*-
#!/usr/local/python35/bin/python3

import requests
from bs4 import BeautifulSoup


def write_file(content):
	f=open("./news.html",'w',encoding='utf8')
	f.write(content)
	f.close()



url = "https://www.bishijie.com/kuaixun/"

req = requests.get(url)
req.encoding = 'utf-8'
content = req.text
#write_file(content)
soup = BeautifulSoup(content,'html.parser')
chapter = soup.find_all(name='div',class_="2019-08-07")

#日期
day = soup.select(".time")

# print(day)

allul = soup.select(".live > ul")

for item in allul:
	print(item)
	print(item.get("id"))   # id  时间戳
	print("------------------------------")
	itemtime = item.select("span")  #时间
	itemtitle = item.select("h2")  #标题
	itemcontent = item.select(".lh32 > div") #内容
	print(itemcontent)
	break



#时间
times = soup.select(".live > ul > span")
#print(len(times))

#标题
titles = soup.select(".live > ul > .lh32 > h2")
# print(titles)

#内容
contents = soup.select(".live > ul > .lh32 > div")
#print(len(contents))

#看多看空
seemore = soup.select(".live > ul > .vote > .seemore")
#print(len(seemore))

#看多看空
bearish = soup.select(".live > ul > .vote > .bearish")
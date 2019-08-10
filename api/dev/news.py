# -*- coding:UTF-8 -*-
#!/usr/local/python35/bin/python3

import requests
from bs4 import BeautifulSoup
import time
import pymysql

def write_file(content):
	f=open("./news.html",'w',encoding='utf8')
	f.write(content)
	f.close()




dbstr = ''
try:
	f = open('./db.txt', 'r')
	dbstr = f.read()
finally:
	if f:
		f.close()



dbdict = eval(dbstr)
print(dbdict)

host = dbdict['host']
user = dbdict['user']
pwd = dbdict['pwd']
dbname = dbdict['dbname']
table = dbdict['table']
port= dbdict['port']



def add(dic):
	# 打开数据库连接
	db =  pymysql.connect(host=host,port=port,user=user,passwd=pwd,db=dbname,use_unicode=True,charset='utf8')

	# 使用 cursor() 方法创建一个游标对象 cursor
	cursor = db.cursor()


	values = "'"+str(dic['addtime'])+"','"+str(dic['title'])+"','"+str(dic['content'])+"','"+str(dic['seemore'])+"','"+str(dic['bearish'])+"','"+str(dic['createtime'])+"','"+str(dic['updatetime'])+"'"+"";
	sql = "insert into news (addtime,title,content,seemore,bearish,createtime,updatetime) values ("+values+")"
	print(sql)
	result =cursor.execute(sql)
	db.commit()
	print(result)
	# 关闭数据库连接
	db.close()


def findByTitle(name,addtime):
	db =  pymysql.connect(host=host,port=port,user=user,passwd=pwd,db=dbname,use_unicode=True,charset='utf8')

	cursor = db.cursor()

	sql = "select count(*) as total from news  where title='"+str(name)+"' and addtime='"+str(addtime)+"'"
	print(sql)
	cursor.execute(sql)
	data = cursor.fetchall()
	db.commit()

	has = 1
	if data[0]==(1,):
		has = 1
		print(name+"已经存在")
	else:
		has = 0

	db.close()
	return has


def update(sql):
	# 打开数据库连接
	db =  pymysql.connect(host=host,port=port,user=user,passwd=pwd,db=dbname,use_unicode=True,charset='utf8')

	# 使用cursor()方法获取操作游标
	cursor = db.cursor()

	# SQL 更新语句
	# sql = "UPDATE EMPLOYEE SET AGE = AGE + 1 WHERE SEX = '%c'" % ('M')
	sql = sql
	try:
		# 执行SQL语句
		cursor.execute(sql)
		# 提交到数据库执行
		db.commit()
		print(sql+'：成功')
	except:
		# 发生错误时回滚
		db.rollback()
		print(sql+'：失败')
	# 关闭数据库连接
	db.close()



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


column ={0:"addtime",1:"title",2:"content",3:'seemore',4:'bearish'}

adddata = {}
for item in allul:
	# print(item)
	adddata['addtime'] = item.get("id")   # id  时间戳

	itemtime = item.select("span")  #时间
	itemtitle = item.select("h2 > a")  #标题
	adddata['title'] = itemtitle[0].string
	itemcontent = item.select(".lh32 > div") #内容
	content = itemcontent[0].text
	content = content.strip()
	adddata['content'] = content

	seemore = item.select(".vote > .seemore > b")[0].text
	adddata['seemore'] = seemore
	bearish = item.select(".vote > .bearish > b")[0].text
	adddata['bearish'] = bearish


	now = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
	adddata['createtime'] = now
	adddata['updatetime'] = now
	has = findByTitle(adddata['title'],adddata['addtime'])

	if has == 0:
		add(adddata)
	#else:
	#	updatesql = "UPDATE bsj SET  price='"+addData['price']+"',updown='"+addData['updown']+"',dayex='"+addData['dayex']+"' WHERE name='"+(addData['name'])+"'"
	#	update(updatesql)





'''
CREATE TABLE `news` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL DEFAULT '' COMMENT '标题',
  `author` varchar(256) NOT NULL DEFAULT '' COMMENT '作者',
  `content` text COMMENT '内容',
  `addtime` varchar(128) DEFAULT '' COMMENT '发布时间',
  `seemore` varchar(16) DEFAULT '1' COMMENT '看多',
  `bearish` varchar(16) DEFAULT '1' COMMENT '看空',
  `source` varchar(128) DEFAULT '1' COMMENT '看空',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='新闻表';


'''


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

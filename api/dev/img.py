from selenium import webdriver
import time
import pymysql
import requests
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions



dbstr = ''
try:
    f = open('d:\\db.txt', 'r')
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
    db = pymysql.connect(host=host,port=port,user=user,passwd=pwd,db=dbname,use_unicode=True,charset='utf8')

    # 使用 cursor() 方法创建一个游标对象 cursor
    cursor = db.cursor()


    values = "'"+str(dic['id'])+"','"+str(dic['name'])+"','"+str(dic['price'])+"','"+str(dic['updown'])+"','"+str(dic['dayex'])+"','"+str(dic['marketvalue'])+"','"+str(dic['addtime'])+"'"+",'"+str(dic['updatetime'])+"'";
    sql = "insert into "+table+"(id,name,price,updown,dayex,marketvalue,addtime,updatetime) values ("+values+")"
    print(sql)
    result =cursor.execute(sql)
    db.commit()
    print(result)
    # 关闭数据库连接
    db.close()


def findByName(name):
    db = pymysql.connect(host=host,port=port,user=user,passwd=pwd,db=dbname,use_unicode=True,charset='utf8')
    cursor = db.cursor()

    sql = "select count(*) as total from "+table+" where name='"+str(name)+"'"
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
    except:
        # 发生错误时回滚
        db.rollback()

    # 关闭数据库连接
    db.close()


browser = webdriver.PhantomJS()

browser.get("https://www.bishijie.com/coins/")

time.sleep(10)

tbody = browser.find_element_by_css_selector("#table_body")
table_rows = browser.find_element_by_css_selector("#table_left").find_elements_by_tag_name("tr")


print(table_rows)
#
# column = {0:'id',1:'name',2:'price',3:'updown',4:'dayex',5:'marketvalue'}
count =0
index =0
fo = open("./foo.txt", "w")


fields = []
texts = []
hrefs = []

for i in table_rows:
    href = i.find_elements_by_tag_name("a")
    imgs = i.find_elements_by_tag_name("img")
    # print("-------------",i,"--------------->")
#

#     addData = {}
    for item in imgs:
        text = item.text
        # print(index,":","  src:",item.get_attribute("src"))
        fo.write( item.get_attribute("src")+".\n")
        fields.append(item.get_attribute("src"))
        index = index+1


    for item1 in href:
        text = item1.text
        texts.append(text)
        hrefs.append(item1.get_attribute("href"))
#         if index<6:
#             addData[column[index]] = text
#             #print("index=",index,"  text=",text,'   dict:',column[index])
#         else:
#             now = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
#             addData['addtime'] = now
#             addData['updatetime'] = now
#     print(addData)
#     has = findByName(addData['name'])
#
#     if has == 0:
#         add(addData)

fo.close()





for i,val in enumerate(fields):
    print("序号："+str(i)+"  text:"+texts[i]+"   href:"+hrefs[i])

    sql = "UPDATE bsj SET  img='"+val+"',uri='"+hrefs[i]+"' WHERE name='"+(texts[i])+"'"
    print(sql);
    update(sql)
    # break;

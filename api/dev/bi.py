from selenium import webdriver
import time
import pymysql
import requests
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions


host = ''
user = ""
pwd = ','
dbname = ''
table = ''
port=


def add(dic):
    # 打开数据库连接
    db =  pymysql.connect(host=host,port=port,user=user,passwd=pwd,db=dbname,use_unicode=True,charset='utf8')

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
    db =  pymysql.connect(host=host,port=port,user=user,passwd=pwd,db=dbname,use_unicode=True,charset='utf8')

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
        print(sql+'：成功')
    except:
        # 发生错误时回滚
        db.rollback()
        print(sql+'：失败')
    # 关闭数据库连接
    db.close()


browser = webdriver.PhantomJS()

browser.get("https://www.bishijie.com/coins/")

time.sleep(10)

tbody = browser.find_element_by_css_selector("#table_body")
table_rows = browser.find_element_by_css_selector("#table_body").find_elements_by_tag_name('tr')


column = {0:'id',1:'name',2:'price',3:'updown',4:'dayex',5:'marketvalue'}
count =0
for i in table_rows:
    j = i.find_elements_by_tag_name("td")
    print("-------------",i,"--------------->")

    index =0
    addData = {}
    for item in j:
        text = item.text
        if index<6:
            addData[column[index]] = text
            #print("index=",index,"  text=",text,'   dict:',column[index])
        else:
            now = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
            addData['addtime'] = now
            addData['updatetime'] = now
        index = index+1
    print(addData)
    has = findByName(addData['name'])

    if has == 0:
        add(addData)
    else:
        updatesql = "UPDATE bsj SET  price='"+addData['price']+"',updown='"+addData['updown']+"',dayex='"+addData['dayex']+"' WHERE name='"+(addData['name'])+"'"
        update(updatesql)






#2019-7-30   m.feixiaohao.com   https://mdncapi.bqiapp.com/api/coin/web-coinrank?webp=0&pagesize=100&page=1&type=-1&client_id=fxh_web&timestamp=2019-07-31+07:58:23&nonce=1564559903&sign=f98b28202ccee360bc3a4b9ee672410d
#
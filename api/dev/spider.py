# -*- coding:UTF-8 -*-
#!/usr/local/python35/bin/python3

import requests
import json
import time
import pymysql

dbstr = ''
try:
    f = open('/www/api/dev/db.txt', 'r')
    dbstr = f.read()
finally:
    if f:
        f.close()


dbdict = eval(dbstr)


host = dbdict['host']
user = dbdict['user']
pwd = dbdict['pwd']
dbname = dbdict['dbname']
table = dbdict['table']
port= dbdict['port']



def write_file(str):
    """ 文件写入"""
    file_name = "/www/805.txt"
    # 以写入的方式打开
    f = open(file_name,'w')
    # 写入内容
    f.write(str)
    # 换行符
    f.write('\n')
    # 写入内容
    f.write('world')

    # 关闭文件
    f.close()


def add(dic):
    # 打开数据库连接
    db =  pymysql.connect(host=host,port=port,user=user,passwd=pwd,db=dbname,use_unicode=True,charset='utf8')

    # 使用 cursor() 方法创建一个游标对象 cursor
    cursor = db.cursor()


    values = "'"+str(dic['id'])+"','"+str(dic['name'])+"','"+str(dic['price'])+"','"+str(dic['updown'])+"','"+str(dic['full_name'])+"','"+str(dic['marketvalue'])+"','"+str(dic['addtime'])+"'"+",'"+str(dic['updatetime'])+"','"+str(dic['ranking'])+"'";
    sql = "insert into "+table+"(id,name,price,updown,full_name,marketvalue,addtime,updatetime,ranking) values ("+values+")"
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





url="https://mdncapi.bqiapp.com/api/coin/web-coinrank?webp=1&pagesize=100&page=1&type=-1&client_id=fxh_web&timestamp=2019-08-04+09:00:42&nonce=1564909242&sign=1157b59192390ebc0fed7531cf63db43";

req = requests.get(url)
jsonstr = req.text

reqdict = json.loads(jsonstr)
reqData = reqdict['data']

column = {0:'id',1:'name',2:'price',3:'updown',4:'dayex',5:'marketvalue'}

addData = {}
for item in reqData:
    addData['id'] = item['rank']
    addData['ranking'] = item['rank']
    addData['name'] = item['name']
    addData['full_name'] = item['fullname']
    addData['price'] = item['current_price']
    addData['updown'] = item['change_percent']
    addData['dayex'] = item['change_percent']
    addData['marketvalue'] = item['market_value']

    now = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    addData['addtime'] = now
    addData['updatetime'] = now

    has = findByName(addData['name'])
    if has == 0:
        add(addData)
    else:
        #updatesql = "UPDATE bsj SET id='"+(str(addData['id']))+"', ranking='"+(str(addData['ranking']))+"', price='"+(str(addData['price']))+"',updown="+"'"+"+(str(addData['updown']))+"',dayex='"+str(addData['dayex'])+"' WHERE name='"+str(addData["name"])+"'"
        updatesql = "UPDATE bsj SET  price='"+(str(addData['price']))+"',updown='"+(str(addData['updown']))+"',dayex='"+(str(addData['dayex']))+"',id='"+(str(addData['id']))+"',ranking='"+(str(addData['ranking']))+"',updatetime='"+(str(addData['updatetime']))+"' WHERE name='"+(addData['name'])+"'"
        write_file(updatesql)
        update(updatesql)



<?php
/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2019/8/4 0004
 * Time: 17:00
 */

$url="https://mdncapi.bqiapp.com/api/coin/web-coinrank?webp=1&pagesize=100&page=1&type=-1&client_id=fxh_web&timestamp=2019-08-04+09:00:42&nonce=1564909242&sign=1157b59192390ebc0fed7531cf63db43";

$data = file_get_contents($url);


$arr = json_decode($data,1);




foreach($arr['data'] as $k=>$dic){

    $values = "'".$k."','".$dic['name']."','".$dic['current_price']."','".$dic['change_percent']."','"+str(dic['dayex'])+"','"+str(dic['marketvalue'])+"','"+str(dic['addtime'])+"'"+",'"+str(dic['updatetime'])+"'";
   $sql = "insert into "+table+"(id,name,price,updown,dayex,marketvalue,addtime,updatetime) values ("+values+")";

/*
    Array
    (
        [current_price] => 74731.46
    [current_price_usd] => 10675.39
    [code] => bitcoin
    [name] => BTC
    [fullname] => 比特币
    [logo] => https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=1561015933
    [change_percent] => -0.5
    [market_value] => 1333616736884
    [vol] => 48766075400
    [supply] => 17845437
    [rank] => 1
    [star_level] => 1
    [kline_data] => 9488.14,9550.27,9469.75,9561.86,9511.89,9674.61,9502.54,9499.57,9500.82,9665.10,9584.58,9661.81,9756.64,9943.38,9997.45,9968.83,9930.87,10062.13,10368.24,10361.43,10500.06,10446.37,10528.14,10821.81,10765.43,10812.17,10807.76,10567.58
    [market_value_usd] => 190507150864
    [vol_usd] => 6966233871
    [marketcap] => 190507150864
    [high_price] => 20089
    [drop_ath] => -46.86
    [low_price] => 65.526
    [high_time] => 2017-12-17
    [low_time] => 2013-07-05
    [isifo] => 0
    [ismineable] => 1
    [ads] => Array
    (
        [0] => MXC;https://www.mxc.com/auth/signup?inviteCode=1Zfr;https://s1.bqiapp.com/image/20190308/mexc_mid.png
        )

    [adpairs] => Array
    (
        [0] =>
        )

    [turnoverrate] => 3.66
)
*/
}





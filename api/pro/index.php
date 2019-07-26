<?php
// header("content-type:text/html;charset=gbk");
function characet($data){
  if( !empty($data) ){
    $fileType = mb_detect_encoding($data , array('UTF-8','GBK','LATIN1','BIG5')) ;
    if( $fileType != 'UTF-8'){
      $data = mb_convert_encoding($data ,'utf-8' , $fileType);
    }
  }
  return $data;
}

$pdo = new PDO("mysql:host=zzz;dbname=test;charset=utf8","",'');

$query = $pdo->query("select * from bsj");

$data = $query->fetchAll(PDO::FETCH_ASSOC);


$imgs = [
	'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3882086854,1489818851&fm=15&gp=0.jpg',
	'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2987825949,1081764878&fm=26&gp=0.jpg',
	'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2549673714,1455553630&fm=15&gp=0.jpg',
	'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1827928860,465457972&fm=15&gp=0.jpg',
	'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2604487792,3014316496&fm=15&gp=0.jpg',
	'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1753213847,3502280280&fm=15&gp=0.jpg',
	'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1665222962,3305578983&fm=15&gp=0.jpg',
	'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=585605422,3072805408&fm=11&gp=0.jpg',
	'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3685670100,4222962583&fm=15&gp=0.jpg',
	'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=530340965,2881396305&fm=15&gp=0.jpg',

];
foreach ($data as $key => &$value) {
	$imgindex = $key%10;
	$value['key'] = $key;
//	$value['avatar_url'] = $imgs[$imgindex];
	$value['id'] = characet($value['id']);
	$value['name'] = characet($value['name']);

	//$value['name'] = explode('-',$value['name']);
	$value['name'] = "rank:".($key+1)."  ".$value['name'];

//	$value['price'] = characet($value['price']);
	$value['updown'] = characet($value['updown']);
	$value['dayex'] = characet($value['dayex']);
	$value['marketvalue'] = characet($value['marketvalue']);

	$img = $value['img'];
	$imgs = explode("?",$img);
	$value['avatar_url'] = $imgs[0];
}



echo json_encode($data,JSON_UNESCAPED_UNICODE);
// $res =json_encode($data,JSON_UNESCAPED_UNICODE);

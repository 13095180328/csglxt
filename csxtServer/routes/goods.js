var express = require('express');
var router = express.Router();

// 引入数据库
const mysql = require('mysql');



const conn = mysql.createConnection({
  host     : 'localhost',    //数据库主机名
  user     : 'root',         //数据库账号
  password : 'root',         //密码
  database : 'yjcsgl'        //使用哪个数据库
});

// 打开数据可连接
conn.connect((err)=>{
  if(err){
    console.log("✖ 数据库连接失败");
  } else {
    console.log("✔ 数据库连接成功");
  }
})


//通用的跨域路由
router.all("*",(req,res,next)=>{
  //res.header("Access-Control-Allow-Origin","*"); //携带cookie证书是，跨域不能使用通配符*
  res.header("Access-Control-Allow-Origin","http://192.168.0.104:8080"); //允许携带cookie证书的域名
  res.header("Access-Control-Allow-Credentials",true);  //值是一个布尔值，表示是否允许发送Cookie
  next(); //放行执行下面的路由
});



//添加商品的路由
router.post("/add",(req,res)=>{
    //2）后端——接收商品信息的数据，连接数据库执行sql语句 /goods/add
    //接收数据
    let {classname,barcode,goodsname,saleprice,marketprice,costprice,stocknum,weight,unit,isdiscount,ispromotion,details}=req.body;

    //构造sql语句
    let sqlStr="insert into goodsinfo(classname,barcode,goodsname,saleprice,marketprice,costprice,stocknum,weight,unit,isdiscount,ispromotion,details) values(?,?,?,?,?,?,?,?,?,?,?,?)";
    let sqlParams=[classname,barcode,goodsname,saleprice,marketprice,costprice,stocknum,weight,unit,isdiscount,ispromotion,details];
    conn.query(sqlStr,sqlParams,(err,result)=>{
        if(err){
            throw err;
        }
        else{
            //3）后端——根据执行是否成功返回json给前端
            if(result.affectedRows>0){
                res.json({"isOk":true,"msg":"商品添加成功!"});
            }
            else{
                res.json({"isOk":false,"msg":"商品添加失败!"});
            }
        }
    })
 });







//获取商品列表的路由
router.get("/getgoods",(req,res)=>{
    //2）后端——接收 商品分类和关键词 结构搜索商品和关键字
    let {classname,keywords}=req.query;
    //构造sql语句  全表语句 1=1 永远为真
    let sqlStr="select * from goodsinfo where 1=1"; //where 1=1永远成立，全表查询

    //3后端解构拿来判断（是否是空）有值就进入判断 字符串累加
    //商品分类有值就执行拼接
    if(classname){
        sqlStr+=` and classname='${classname}'`; //字符串加引号
    }
    //后端解构拿来判断（是否是空）有值就进入判断 字符串累加
    //关键词有值就执行拼接
    if(keywords){
        sqlStr+=` and (goodsname like '%${keywords}%' or barcode like '%${keywords}%')`; //商品名和条码二选一
    }

    //拼接排序的字句【排序-------------------------】
    sqlStr+=" order by goodsid DESC";
    //执行查询获取总的满足条件的记录数
    let total=0;
    conn.query(sqlStr,(err,goodsTotal)=>{
        if(err){
            throw err;
        } else {
            total = goodsTotal.length;
        }
    })

    //分页-------------------------------------------
    // 解构拿到每页显示 条数 和 当前也
    let {pagesize,currentpage}=req.query;
    //拼接分页的sql语句
    if(pagesize && currentpage){
        let skip= (currentpage-1) * pagesize;
        sqlStr +=` limit ${skip},${pagesize}`;
    }




    //执行sql查询：4）后端——执行sql查询就是要搜索的结果，并把结果返回前端
    conn.query(sqlStr,(err,goodsArray)=>{
        if(err){
            throw err;
        }
        else{
            res.send({"total":total,"goodsArray":goodsArray}); //如果没有数据就是空数组，有数据就是数组对象
        }
    });
});







/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('node后端服务器');
});


module.exports = router;

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
  res.header("Access-Control-Allow-Origin","*");
  next(); //放行执行下面的路由
});



// 注册页面的路由
router.post('/useradd',(req,res)=>{
  // 设置请求头 跨域请求从设置这个
  res.header("Access-Control-Allow-Origin","*");
  // 解构参数（前端发过来的擦参数）
  let {username,pass,userElect}=req.body;
  console.log(username,pass,userElect);

  //三个问号表示占位符，后期使用参数数组替换
  let sqlStr="insert into userinfo(username,userpwd,usergroup) values(?,?,?)";
  let sqlParmas=[username,pass,userElect];

  // 执行sql语句 
  //语法：conn.query("sql语句","参数数组",回调函数(err错误对象,result返回的结果)=>{});
  conn.query(sqlStr,sqlParmas,(err,result)=>{
    if(err){
      throw err;
    } else {
      // 执行的结果
      // affectedRows: 1,  //受影响的行数，大于0表示执行成功
      console.log(result);
      if(result.affectedRows > 0){
        res.json({'isOk':true, 'code':1, 'msg':"✔ 用户添加成功"})
      } else {
        res.json({'isOk':false, 'code':-1, 'msg':"✖ 用户添加失败"})
      }
      
    }
  })
})






// 查看用户列表路由
router.get('/userlist',(req,res)=>{
  //1. 构造sql语句 是查询语句
  let sqlStr="select * from userinfo order by userid DESC"; //按用户id降序排列
  // 执行sql语句     错误   返回的数据
  conn.query(sqlStr,(err,result)=>{
    if(err){
      throw err;
    } else {
      // 没错就返回给前端
      res.send(result)
    }
  })
})

























/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('node后端服务器');
});


module.exports = router;

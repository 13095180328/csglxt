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


// 注册页面的路由
router.post('/useradd',(req,res)=>{
  // 设置请求头 跨域请求从设置这个
  // res.header("Access-Control-Allow-Origin","*");
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





//删除用户  用户列表删除按钮
router.get('/dellist',(req,res)=>{
  // 接受前端发过来的数据（id）
  let userid = req.query.userid;
  // 构造sql删除语句 将拿到的id拼接 
  let sqlStr=`delete from userinfo where userid=${userid}`;
  //执行sq语句
  conn.query(sqlStr,(err,datas)=>{
    //根据datas返回的对象属性 中//result对象中有属性 affectedRows: 1,  //受影响的行数，大于0表示执行成功
    if(datas.affectedRows > 0){
      // 只要大于0  就说明对数据库操作了 就返回给前端数据
      res.json({"isOk":true,"code":1,"msg":"✔ 用户删除成功!"})
    } else {
      res.json({"isOk":false,"code":-1,"msg":"✖ 用户删除失败!"})
    }
  })
})

// 编辑  修改 资料
router.get('/getuserid',(req,res)=>{
  let sqlid = req.query.userid;
  // 构造sql语句 条件是id
  let sqlStr="select * from userinfo where userid="+sqlid;
  // 执行构造语句
  conn.query(sqlStr,(err,result)=>{
    if(err){
      throw err;
    } else {
      // 返回的是当前查询的数据
      res.send(result)
    }
  })
})
// 点击确认修改 返回的是用户修改后的数据
router.post('/newuserdata',(req,res)=>{
  // 此时接受的是用户修改的新数据需要保存到数据库 （需结构）
  let{username,userpwd,usergroup,userid} = req.body;
  //参数数组在替换是会自动添加单引号，所有我们自己构造sql是不用再加单引号
  let sqlStr="update userinfo set username=?,userpwd=?,usergroup=? where userid=?";
  let sqlParams=[username,userpwd,usergroup,userid];
  // 执行sql语句
  conn.query(sqlStr,sqlParams,(err,result)=>{
    if(err){
      throw err;
    } else {
      // 返回的是一个对象 这个属性affectedRows大于0就说明对数据库操作成功
      if(result.affectedRows > 0){
        res.json({"isOk":true,"code":1,"msg":"用户修改成功！"});
      } else {
        res.json({"isOk":false,"code":-1,"msg":"用户修改失败！"});
      }
    }
  })
})






// 当前用户修改密码   
router.post('/pwdEdit',(req,res)=>{
  let{userpwd,newpass,checkPass} = req.body;
  console.log(userpwd,newpass,checkPass);
  let cookieval = req.cookies.username;
  console.log("cookie:----"+cookieval);
  //构造sql语句
  let newsql = "update userinfo set userpwd=? where username=? and userpwd=?";
  let newsqlArr = [newpass,cookieval,userpwd];
  conn.query(newsql,newsqlArr,(err,result)=>{
    if(err){
      res,send({'isOk':false, 'msg':"✖ 密码修改失败"})
    } else {
      if(result.affectedRows > 0){
        //数据库修改完成后 删除cookie 并返回提示信息
        res.clearCookie("userid");
        res.clearCookie("username");
        res.json({'isOk':true, 'msg':"✔ 密码修改成功"})
      }
    }
  })
})












// 验证登录页面
router.post('/checkLogin',(req,res)=>{
  // 结构传过来的参数（账号和密码）
  let{userpwd,username} = req.body;
  // 构造sql语句 去数据可查询 条件就是（账号与密码同时一样才行）
  let sqlStr="select * from userinfo where username=? and userpwd=?";
  let sqlParams=[username,userpwd];
  conn.query(sqlStr,sqlParams,(err,result)=>{
    if(err){
      throw err;
    } else {
      // 只要满足账号密码一样 返回的data 就不是空数组（否则是空数组）
        // 只要大于就是数据库存在的 并返回的数据
      if(result.length > 0){
        //登录成功 写入cookie
        res.cookie('userid',result[0].userid);
        res.cookie("username",username);
        res.send({"isOk":true,"msg":"用户登录成功！"});
      } else {
        //登录失败
        res.send({"isOk":false,"msg":"用户账号或密码错误"});
      }
    }
  })
})

// 全局路由守卫 负责检查有cookie认证就是合法的 没有就清除去登录页面
router.get('/getCookie',(req,res)=>{
  let userid = req.cookies.userid;
  let username = req.cookies.username;
  if(userid && username){
    res.send({"isOk":true});
  }else{
    res.send({"isOk":false});
  }
})



// 退出系统
router.get('/userOut',(req,res)=>{
  // 清除cookies
  res.clearCookie("userid");
  res.clearCookie("username");
  res.send({'isOk':true, msg:"退出成功,欢迎下次登录"})
})














/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('node后端服务器');
});


module.exports = router;

//引入express
let express=require('express');

let db=require('./db');
let usersModel=require('./model/users');
const PORT=3000;
let app =express();
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
db
    .then(()=>{
        //注册
        app.post('/register',async(request,response)=>{
            let {email,user_name,password,re_password}=request.body;
            let emailReg=/^[a-zA-Z0-9_]{5,16}@[a-zA-Z0-9]{2,8}\.com$/;
            let userNameReg=/^[a-zA-Z0-9]{5,16}$/;
            let passwordReg=/^[a-zA-Z0-9_#@!]{6,20}$/;
            if(!emailReg.test(email)){
                response.send('邮箱输入不合法');
                return;
            }else if(!userNameReg.test(user_name)){
                response.send('姓名输入不合法');
                return;
            }else if(!passwordReg.test(password)){
                response.send('密码输入不合法');
                return;
            }else if(password!==re_password){
                response.send('两次密码不一致');
                return;
            }
           try {
               let findResult=await usersModel.findOne({email});
               if(findResult){
                   response.send(`${email}邮箱已经注册过，不能重复注册`);
                   return;
               }else{
                   await usersModel.create({email,user_name,password});
                   response.send(`${email}邮箱注册成功`);
                   console.log(`邮箱为：${email}，姓名为：${user_name}的用户注册成功！${Date.now()}`);
                   return;
               }
           }catch (e) {
               console.log(e);
               response.send('当前网络不稳定，请稍后重试');
           }
        })
        //登录
        app.post('/login',async(request,response)=>{
            let {email,password}=request.body;
            let emailReg=/^[a-zA-Z0-9_]{5,16}@[a-zA-Z0-9]{2,8}\.com$/;
            let passwordReg=/^[a-zA-Z0-9_#@!]{6,20}$/;
            if(!emailReg.test(email)){
                response.send('邮箱输入不合法');
                return;
            }else if(!passwordReg.test(password)){
                response.send('密码输入不合法');
                return;
            }
            try {
                let findResult=await usersModel.findOne({email,password});
                if(findResult){
                    console.log(`邮箱为${email}的用户登录成功`);
                    response.redirect('http://www.baidu.com');
                }else{
                    console.log(`邮箱为${email}的用户登录失败`);
                    response.send('登录失败，邮箱或密码错误');
                }
            }catch (e) {
                console.log(e);
                response.send('当前网络不稳定，请稍后重试');
            }
        });
    })
    .catch((err)=>{
        console.log(err);
    });
//UI路由
app.get('/register',(request,response)=>{
    response.sendFile(__dirname+'/public/register.html');
});
app.get('/login',(request,response)=>{
    response.sendFile(__dirname+'/public/login.html');
});
app.listen(PORT,(err)=>{
    if(!err) console.log(`服务器启动成功了,端口号为:${PORT}`);
    else console.log(err);
});
//中间件的使用
let express=require('express');
// let bodyParser=require('body-parser');
let app=express();
app.use(express.urlencoded({extended:true}));//内置中间件
app.use(express.static('public'));//暴露静态资源
// app.use(bodyParser({extended:true}));//解析post请求体中的参数为一个对象挂载到request
//应用级中间件第一种写法
// app.use((request,response,next)=>{
//    console.log('应用级中间件被调用了');
//    let host=request.get('host');
//    if(host!=='localhost:3000'){
//        response.send('<h1>禁止盗用本站链接</h1>')
//    }else{
//        next();
//    }
// });
function myMiddleware(request,response,next){
   console.log('应用级中间件被调用了');
   let host=request.get('host');
   if(host!=='localhost:3000'){
       response.send('禁止调用本站链接');
   }else{
       next();
   }
}

app.get('/test',(request,response)=>{
    response.send('test路由');
});
app.get('/test2',myMiddleware,(request,response)=>{
    response.send('test2路由');
});
app.post('/test3',(request,response)=>{
    console.log(request.body);
    response.send('test3路由');
});
app.get('/index',(request,response)=>{
    response.sendFile(__dirname+'/public/index.html');
});
app.get('/index2',(request,response)=>{
    response.sendFile(__dirname+'/public/index2.html');
});
app.listen(3000,(err)=>{
    if(!err) console.log('服务器连接成功了');
    else console.log(err);
});
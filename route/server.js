let express=require('express');

let app=express();
//根路由
app.get('/',(request,response)=>{
    //request对象上的方法
    console.log(request.query);//查询查询字符串的参数
    console.log(request.body);//需要中间件
    console.log(request.get('host'));//获取请求头中指定key对应的value
    //response对象上的方法

    //response.download('./public/demo.jpg');//告诉浏览器下载一个文件(相对路径)
    // response.sendFile(__dirname+'/public/index.html');//给浏览器发送一个文件
    // response.redirect('http://www.baidu.com');//重定向到一个新的地址
    // response.set('demo',123);//自定义响应头内容
    // console.log(response.get('demo'));//获取响应头指定key对应的value
    // response.status()//设置响应状态码
    response.send('主页');

});

app.get('/login',(request,response)=>{
    response.send('我是一级路由---login');
});
app.get('/index/test',(request,response)=>{
     response.send('我是二级路由---index--test');
});

//参数路由
app.get('/index/test/:id',(request,response)=>{
    console.log(request.params);
    response.send(`我是参数路由---index---test---${request.params.id}`);
});
app.listen(3000,(err)=>{
    if(!err) console.log('服务器连接成功了');
    else console.log(err);
});
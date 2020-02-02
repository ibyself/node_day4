let http=require('http');
let {parse}=require('querystring');
let server=http.createServer((request,response)=>{
    let parma=request.url.split('?')[1];
    let parmaObj=parse(parma);
    console.log(parmaObj.name);
   response.end('ok');
});
server.listen(3000,(err)=>{
    if(!err) console.log('服务器启动成功了');
    else console.log(err);
})
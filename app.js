const http = require('http');

const server = http.createServer((req,res)=>{
    console.log("server is created");

    res.setHeader("content-type","text/html");

    if(req.url==="/"){
        req.statusCode= 200;
        res.end("<h1>Hello World</h1>");
    }else{
        res.statusCode = 200;
        if(req.url ==="/home"){
            res.end("<h1>Welcome Home</h1>");
        }else if(req.url ==="/about"){
             res.end("<h1>Welcome to About Us</h1>")
        }else if(req.url ==="/node"){
            res.end("<h1>Welcome to my Node Js project</h1>")
        }
        else{
            res.statusCode = 404;
            res.end("<h1>page not found</h1>");
        }
    }
})

const port = 3000;
server.listen(port,()=>{
    console.log("server is running");
});
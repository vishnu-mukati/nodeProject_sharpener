// const http = require('http');
// const fs = require('fs');
// const server = http.createServer((req, res) => {
//     console.log("server is created");

//     const url = req.url;
//     const method = req.method;

//     if (url === "/") {
//         res.setHeader("content-type", "text/html");
//         res.end(
//             `
//             <form action="/message" method="POST">
//             <label>name:</label>
//             <input type="text" name="username"/>
//             <button type="submit">Add</button>
//             </form>
//             `
//         )
//     }else{
//         if(url === "/message"){
//             res.setHeader("content-type","text/html");
//             const dataChunks = [];
//             req.on("data",(chunks)=>{
//                 console.log(chunks);
//               dataChunks.push(chunks);
//             })

//             req.on("end",()=>{
//                 let combinedData = Buffer.concat(dataChunks);
//                 console.log(combinedData.toString());
//                 const value = combinedData.toString().split("=")[1];
//                 console.log(value);

//                 fs.writeFile("formValues.txt",value,(err)=>{
//                      res.statusCode=302;//redirection
//                      res.setHeader('location','/')
//                      res.end();
//                 })
//             })
//         }else{
//             if(req.url ==="/read"){
//                 fs.readFile('formValues.txt',(err,data)=>{
//                     console.log(data.toString());
//                     res.end(`
//                         <h1>${data.toString()}</h1>`);
//                 })
//             }
//         }
//     }
// })

// const port = 3000;
// server.listen(port, () => {
//     console.log("server is running");
// });

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log("server is created");

    const url = req.url;
    const method = req.method;

    if (url === "/") {
        fs.readFile('formValues.txt', (err, data) => {
            let savedValue = '';
            if (!err) {
                savedValue = data.toString();
            }

            res.setHeader("content-type", "text/html");
            res.end(
                `
                <h1>${savedValue}</h1>
                <form action="/message" method="POST">
                    <label>name:</label>
                    <input type="text" name="username" />
                    <button type="submit">Add</button>
                </form>
                `
            );
        });

    } else if (url === "/message" && method === "POST") {
        const dataChunks = [];

        req.on("data", (chunks) => {
            dataChunks.push(chunks);
        });

        req.on("end", () => {
            const combinedData = Buffer.concat(dataChunks).toString();
            const value = combinedData.split("=")[1];

            fs.writeFile("formValues.txt", value, (err) => {
                res.statusCode = 302; // redirection
                res.setHeader('location', '/');
                res.end();
            });
        });

    } else if (url === "/read") {
        fs.readFile('formValues.txt', (err, data) => {
            res.setHeader("content-type", "text/html");
            res.end(`<h1>${data.toString()}</h1>`);
        });

    } else {
        res.statusCode = 404;
        res.end("Not Found");
    }
});

const port = 3000;
server.listen(port, () => {
    console.log("server is running");
});

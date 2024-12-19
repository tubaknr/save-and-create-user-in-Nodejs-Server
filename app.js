const http = require('node:http');

const users = [];

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/"){
        res.write("<html>");
        res.write("<body>");
        res.write("<h1>Greetinggsssss!</h1>");
        res.write("<form action='/create-user' method='POST'><input type='text' name='username'></input><button type='submit'>Send</button></form>");
        res.write("</body>");
        res.write("</html>");
        return res.end();
    }

    if(url === "/create-user" && method === "POST"){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split("=")[1];
            if(username){
                users.push(decodeURIComponent(username));
            }
            res.statusCode = 302;
            res.setHeader("Location", '/users');
            return res.end();
        });

    }

    if (url === "/users"){ // BURAYA GET REQ ATILDDIĞI İÇİN BURADA BODY YOK.
        res.write("<html>");
        res.write("<body>");
        res.write("<ul>");
        res.write("<li>User 1!</li>");
        res.write("<li>User 2!</li>");
        res.write("<li>User 3!</li>");
        users.forEach((user) => {
            res.write(`<li>${user}</li>`);
        })
        res.write("</ul>");
        res.write("</body>");
        res.write("</html>");
        return res.end();

    }

});

server.listen(5000);

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const serveFile = (res, filePath, statusCode = 200) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>500 Internal Server Error</h1>');
            return;
        }

        res.writeHead(statusCode, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
    });
};

const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    let route = url.pathname.toLowerCase();

    if (route === '/') {
        route = '/home';
    }

    route = route.replace(/\/+$/, '') || '/';

    switch (route) {
        case '/home':
            serveFile(res, path.join(__dirname, 'public', 'index.html'));
            break;
        case '/about':
            serveFile(res, path.join(__dirname, 'public', 'about.html'));
            break;
        case '/contact':
            serveFile(res, path.join(__dirname, 'public', 'contact.html'));
            break;
        default:
            serveFile(res, path.join(__dirname, 'public', '404.html'), 404);
            break;
    }
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
// https here is necesary for some features to work, even if this is going to be behind an SSL-providing reverse proxy.
const https = require('http');
const fs = require('fs');
const path = require('path');
const Corrosion = require('corrosion');
const PORT = process.env.PORT || 8443;

// you are free to use self-signed certificates here, if you plan to route through an SSL-providing reverse proxy.
const ssl = {
    key: fs.readFileSync(path.join(__dirname, '/ssl.key')),
    cert: fs.readFileSync(path.join(__dirname, '/ssl.cert')),
};
const server = https.createServer(ssl);
const proxy = new Corrosion({
    codec: 'xor', // apply basic xor encryption to url parameters in an effort to evade filters. Optional.
    prefix: '/get/' // specify the endpoint (prefix). Optional.
});

proxy.bundleScripts();

server.on('request', (request, response) => {
    console.log(request.url)
    if (request.url.startsWith(proxy.prefix)) return proxy.request(request, response);
    else if (request.url == '/chrome.html' || request.url == '/docs/chrome.html') return response.end(fs.readFileSync(__dirname + '/chrome.html', 'utf-8'));
    else if (request.url == '/') return response.end(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
    else if (request.url == '/docs/') return response.end(fs.readFileSync(__dirname + '/docs/index.html', 'utf-8'));
    else if (request.url == '/docs/local-development') return response.end(fs.readFileSync(__dirname + '/docs/local-dev.html', 'utf-8'));
    else if (request.url == '/docs/deploy-clone') return response.end(fs.readFileSync(__dirname + '/docs/deploy-clone.html', 'utf-8'));
    else if (request.url == '/contact/') return response.end(fs.readFileSync(__dirname + '/contact.html', 'utf-8'));
}).on('upgrade', (clientRequest, clientSocket, clientHead) => proxy.upgrade(clientRequest, clientSocket, clientHead)).listen(PORT); // port other than 443 if it is needed by other software.

const port = 3232;
const httpsPort = 3233;
const http = require('http');
const https = require('https');
const express = require('express');
const app = express();
const sitesMiddleware = require('./lib/sites.middleware');
const fs = require('fs');

const privateKey = fs.readFileSync('cert/server.key');
const certificate = fs.readFileSync('cert/server.crt');
const credentials = {key: privateKey, cert: certificate};


app.use(express.static('public'));
app.use(require('body-parser').json());

app.use('/node_modules', express.static('node_modules'));

app.post('/sites', sitesMiddleware.post);
app.get('/sites', sitesMiddleware.get);

app.get('/redir', (req, res) => {
   res.redirect('http://localhost:3232/simple/invisible-captcha.html');
});

app.get('/cook', (req, res) => {
    res.set('Set-Cookie', req.query.cookie);
    res.send();
});

app.get('/api', (req, res) => {
    res.send(req.query);
});

app.get('/logout', () => {
    console.log('logout called');
});
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(port, () => console.log(`listening on ${port}`));
httpsServer.listen(httpsPort, () => console.log(`listening on ${httpsPort}`));

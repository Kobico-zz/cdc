const port = 3232;
const express = require('express');
const app = express();
const sitesMiddleware = require('./lib/sites.middleware');

app.use(express.static('public'));
app.use(require('body-parser').json());

app.use('/node_modules', express.static('node_modules'));

app.post('/sites', sitesMiddleware.post);
app.get('/sites', sitesMiddleware.get);

app.get('/logout', () => {
    console.log('logout called');
});

app.listen(port, () => console.log(`listening on ${port}`));

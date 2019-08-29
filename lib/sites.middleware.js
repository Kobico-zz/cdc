const hostile = require('hostile');
const JsonDB = require('node-json-db').JsonDB;
const Config = require('node-json-db/dist/lib/JsonDBConfig').Config;
const db = new JsonDB(new Config("sites", true, true));
module.exports = {
    post: function(req, res) {
        db.push(`/${req.body.dc}/${req.body.domain}`, {
            apiKey: req.body.apiKey,
            dc: req.body.dc,
            env: req.body.env,
            screenSetPrefix: req.body.screenSetPrefix
        });
        hostile.set('127.0.0.1', req.body.domain, function (err) {
            if (err) {
                console.error(err)
            } else {
                console.log('set /etc/hosts successfully!')
            }
            res.send();
        });
    },
    get: function(req, res) {
        let data = {};
        try {
            if(req.query.domain) {
                data = db.getData(`/${req.query.dc}/${req.query.domain}`);
            } else {
                data = db.getData(`/${req.query.dc}`);
            }
        }
        catch(e) {
            console.log('failed to get site')
        }
        finally {
            res.json(data);
        }
    }

};

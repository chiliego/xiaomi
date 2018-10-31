var express = require('express');
var app = express();
const miio = require('miio');

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/miio', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    miio.device({address: '192.168.178.55', token: '6c6976646f5834795565514161383342'})
        .then(device => {
            device.call("get_status", [], {
                refresh: ['state'],
                refreshDelay: 1000
            })
                .then(status => {
                    res.send(JSON.stringify(status));
                })
                .catch(console.error);
        })
        .catch(err => console.log(err));
});

app.put('/zonedClean', function (req, res) {
    console.log(req.body);

    const zones = req.body;
    miio.device({ address: '192.168.178.55', token: '6c6976646f5834795565514161383342' })
        .then(device =>{
            console.log('Connected to', device)
            device.call('app_zoned_clean', zones, {
                refresh: [ 'state' ],
                refreshDelay: 1000
            })
                .then(deviceResp => res.status(200).send(deviceResp))
                .catch(deviceErr => res.status(500).send(deviceErr));
        })
        .catch(err => res.status(500).send(err));

});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

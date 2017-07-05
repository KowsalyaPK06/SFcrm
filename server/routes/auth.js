const express = require('express');
const authRouter = express.Router();
var https = require('https');
// var querystring = require('querystring');


const authToken = "aa57b50823b47f90b10b42d35f9e05c9";

/* GET api listing. */
authRouter.get('/', (req, res) => {
    res.send('auth works');
});



var host = 'https://login.salesforce.com/services';
var username = 'JonBob';
var password = '*****';
var apiKey = '*****';
var sessionId = null;
var deckId = '68DC5A20-EE4F-11E2-A00C-0858C0D5C2ED';

function performRequest(endpoint, method, data, success) {
    var dataString = JSON.stringify(data);
    var headers = {};

    if (method == 'GET') {
        endpoint += '?' + querystring.stringify(data);
    }
    else {
        headers = {
            'Content-Type': 'application/json',
            'Content-Length': dataString.length
        };
    }
    var options = {
        host: host,
        path: endpoint,
        method: method,
        headers: headers
    };

    var req = https.request(options, function (res) {
        res.setEncoding('utf-8');

        var responseString = '';

        res.on('data', function (data) {
            responseString += data;
        });

        res.on('end', function () {
            console.log(responseString);
            var responseObject = JSON.parse(responseString);
            success(responseObject);
        });
    });

    req.write(dataString);
    req.end();
}


authRouter.get('/login', (req, res) => {
    var data = {
        "grant_type": "password",
        "client_id": "3MVG9d8..z.hDcPLJsDkfc.PmnZBpNM_3Dzm7tuxU0hnQ8g1vl0N7WZeRFT03wPONBqTOzzk8sJ6DF0t9TbB3",
        "client_secret": "6258344917667469925",
        "username": "kowsalya@samplecrm.com",
        "password": ""
    }
    // performRequest("oauth2/token", "GET")

    https.get('https://login.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9d8..z.hDcPLJsDkfc.PmnZBpNM_3Dzm7tuxU0hnQ8g1vl0N7WZeRFT03wPONBqTOzzk8sJ6DF0t9TbB3&client_secret=6258344917667469925&username=kowsalya@samplecrm.com&password=salesforce@75MOuohAuXr2svXB6UH3BTc2c', (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        res.on('data', (d) => {
            process.stdout.write(d);
        });

    }).on('error', (e) => {
        console.error(e);
    });
});


authRouter.get('/oauth/callback', (res) => {
    console.log(res);
});


module.exports = authRouter;
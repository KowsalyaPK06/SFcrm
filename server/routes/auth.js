const express = require('express');
const authRouter = express.Router();
var nforce = require('nforce');


var org = nforce.createConnection({
    clientId: '3MVG9d8..z.hDcPLJsDkfc.PmnZBpNM_3Dzm7tuxU0hnQ8g1vl0N7WZeRFT03wPONBqTOzzk8sJ6DF0t9TbB3',
    clientSecret: '6258344917667469925',
    redirectUri: 'https://salesforcecrm.herokuapp.com/sf/oauth/callback'
    // redirectUri: 'http://localhost:3000/sf/oauth/callback'
    // apiVersion: 'v27.0',  // optional, defaults to current salesforce API version
    // environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
    // mode: 'multi' // optional, 'single' or 'multi' user mode, multi default
});

/* GET api listing. */
authRouter.get('/', (req, res) => {
    res.send('auth works');
});


authRouter.get('/login', (req, res) => {
    var oauth;
    org.authenticate({ username: 'kowsalya@samplecrm.com', password: 'salesforce@75MOuohAuXr2svXB6UH3BTc2c' }, function (err, resp) {
        // store the oauth object for this user
        console.log("error");
        console.log(err);
        if (!err) {
            console.log("respnse");
            console.log(resp);
            oauth = resp
        };
    });
});


authRouter.get('/oauth/callback', (res) => {
    console.log(res);
});


module.exports = authRouter;
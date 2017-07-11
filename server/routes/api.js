const express = require('express');
const router = express.Router();
const multer = require("multer");
var nforce = require('nforce');


var org = nforce.createConnection({
  clientId: '3MVG9d8..z.hDcPLJsDkfc.PmnZBpNM_3Dzm7tuxU0hnQ8g1vl0N7WZeRFT03wPONBqTOzzk8sJ6DF0t9TbB3',
  clientSecret: '6258344917667469925',
  mode: 'single',
  autoRefresh: true,
  apiVersion: 'v40.0',  // optional, defaults to current salesforce API version
  redirectUri: 'https://salesforcecrm.herokuapp.com/sf/oauth/callback'
  // redirectUri: 'http://localhost:3000/sf/oauth/callback'
  // environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
  // mode: 'multi' // optional, 'single' or 'multi' user mode, multi default
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});


router.post('/createLead', (req, res) => {
  var postData = req.body;
  var lead = nforce.createSObject('Lead');
  lead.set('Salutation', postData.Salutation);
  lead.set('FirstName', postData.FirstName);
  lead.set('LastName', postData.LastName);
  lead.set('Company', postData.Company);
  lead.set('Status', 'Open - Not Contacted');

  org.insert({ sobject: lead }, function (err, resp) {
    console.log(err);
    if (!err) {
      res.send({ "msg": "Successfully Inserted" });
    }
  });
});

router.get('/getLeads', (req, res) => {
  org.authenticate({ username: 'kowsalya@samplecrm.com', password: 'salesforce@75MOuohAuXr2svXB6UH3BTc2c' }, function (err, resp) {
    console.log(err);
    if (!err) {
      var query = "SELECT FirstName, LastName, Company, Status, Email, Phone FROM Lead";

      org.query({ query: query, raw: true, fetchAll: true }, function (err, data) {
        if (err) console.error(err);
        else {
          res.send(data.records);
        };
      });

    }
  });
});


var uploadImage = function (file, cb) {
  var q = "SELECT Id, Name FROM Lead WHERE Name = 'test trigger' LIMIT 1";
  org.query({ query: q }, function (err, resp) {
    if (!err && resp.records) {
      var baseString = file.buffer.toString('base64');
      var imageData = "data:image/jpeg;base64," + baseString;
      var imageSrc = '<img alt="images.jpg" src="' + imageData + '"></img>';
      var lead = resp.records[0];
      lead.set('Sample_image__c', imageSrc);

      org.update({ sobject: lead }, function (err, resp) {
        if (!err) {
          return cb(null, { "msg": "Upload image Success" });
        }
        return cb(err);
      });
    }
    return cb(err);
  });
};

// to read the uploaded file as buffer
var upload = multer().single('file');

/** API path that will upload the files */
router.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      res.end("Error uploading file.");
    }

    uploadImage(req.file, function (err, response) {
      if (!err) {
        res.end(response);
      }
      res.end("Error uploading file", err);
    });
  });
});

router.get('/login', (req, res) => {
  var oauth;
  org.authenticate({ username: 'kowsalya@samplecrm.com', password: 'salesforce@75MOuohAuXr2svXB6UH3BTc2c' }, function (err, resp) {
    // store the oauth object for this user
    console.log("login error");
    console.log(err);
    if (!err) {
      console.log("login respnse");
      console.log(resp);
      res.send({ "msg": "Login Success" });
    }
  });
});

router.get('/oauth/callback', (res) => {
  console.log("oauth callback response");
  console.log(res);
});


module.exports = router;
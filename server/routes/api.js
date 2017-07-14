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
  lead.set('Salutation', postData.salutation);
  lead.set('FirstName', postData.firstname);
  lead.set('LastName', postData.lastname);
  lead.set('Company', postData.company);
  lead.set('Phone', postData.phone);
  lead.set('Email', postData.email);
  lead.set('Status', 'Open - Not Contacted');

  org.insert({ sobject: lead }, function (err, resp) {
    if (err) {
      return res.send(err);
    }
    res.send({ "msg": "Successfully Inserted" });
  });
});

router.get('/getLeads', (req, res) => {
  var query = "SELECT firstname, LastName, Company, Status, Email, Phone FROM Lead";
  org.query({ query: query, raw: true, fetchAll: true }, function (err, data) {
    if (err) {
      return res.send(err);
    }
    res.send(data.records);
  });
});

router.get('/getLead', (req, res) => {
  var leadId = req.query.leadId;
  org.getRecord({ type: 'lead', id: leadId }, function (err, data) {
    if (err) {
      return res.send(err);
    }
    res.send(data);
  });
});


var uploadImage = function (file, param, cb) {
  var baseString = file.buffer.toString('base64');
  var imageData = "data:image/jpeg;base64," + baseString;
  var imageSrc = '<img alt="images.jpg" src="' + imageData + '"></img>';
  var lead = nforce.createSObject('Lead');
  lead.set('id', param.id);
  lead.set('Sample_image__c', imageSrc);

  org.update({ sobject: lead }, function (err, resp) {
    if (!err) {
      return cb(null, { "msg": "Upload image Success" });
    }
    return cb(err);
  });
};

// to read the uploaded file as buffer
var upload = multer().single('file');
// let upload  = multer({ storage: multer.memoryStorage() });

/** API path that will upload the files */
router.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.send("Error uploading file.");
    }
    uploadImage(req.file, req.body, function (err, response) {
      if (!err) {
        console.log(response);
        return res.send(response);
      }
      res.send(err);
    });
  });
});

router.get('/login', (req, res) => {
  org.authenticate({ username: 'kowsalya@samplecrm.com', password: 'salesforce@75MOuohAuXr2svXB6UH3BTc2c' }, function (err, resp) {
    // store the oauth object for this user
    if (!err) {
      return res.send({ "msg": "Login Success" });
    }
    res.send(err);
  });
});

router.get('/oauth/callback', (res) => {
  console.log("oauth callback response");
  console.log(res);
});


module.exports = router;
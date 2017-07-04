// const Zoho = require('node-zoho');
const express = require('express');
const router = express.Router();
const multer = require("multer");
const request = require("request");
// const streamifier = require("streamifier");
const fs = require("fs");


// const Globals = require('./../global');
// import * as myGlobals from './../globals';

const authToken = "aa57b50823b47f90b10b42d35f9e05c9";

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});


router.get('/getLeads', (req, res) => {
  // // console.log("it hits here")
  // // console.log(Globals);
  // // console.log(myGlobals);
  // // console.log("and here")

  // zoho = new Zoho({ authToken: authToken });
  // zoho.execute('crm', 'Leads', 'getRecords', {}, function (err, result) {
  //   if (err !== null) {
  //     console.log(err);
  //     res.send(err);
  //   } else if (result.isError()) {
  //     console.log(result.message);
  //     res.send(result.message);
  //   } else {
  //     res.send(result.data);
  //   }
  // });
});


router.post('/createLead', (req, res) => {
  // zoho = new Zoho({ authToken: authToken });
  // records = req.body.records;
  // zoho.execute('crm', 'Leads', 'insertRecords', records, function (err, result) {
  //   if (err !== null) {
  //     console.log(err);
  //     res.send("Hi successfull return from backend server 1");
  //   } else if (result.isError()) {
  //     console.log(result.message);
  //     res.send("Hi successfull return from backend server 2");
  //   } else {
  //     res.send(result);
  //   }
  // });
});


module.exports = router;
// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');


const app = express();

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


// Get our API routes
const api = require('./server/routes/api');
// Set our api routes
app.use('/api', api);
app.use('/sf', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);


/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
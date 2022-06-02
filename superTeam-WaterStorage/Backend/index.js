// index.js
// This is our main server file

// include express
const express = require("express");
// create object to interface with express
const app = express();
const fetch = require("cross-fetch");

// Code in this section sets up an express pipeline

// print info about incoming HTTP request 
// for debugging
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
})

// No static server or /public because this server
// is only for AJAX requests

// respond to all AJAX querires with this message
app.use(function(req, res, next) {
  // req.json({msg: "No such AJAX request"})
  next();
});

app.get("/query/getList", (request, response) => {
  let year  = request.query.year;
  let month = request.query.month;
  requestCurrentLakeWaterLevel(response, year, month);
});

app.use(function (request, response) {
  response.status(404);
  response.send("Backend cannot answer");
})
// end of pipeline specification

// Now listen for HTTP requests
// it's an event listener on the server!
const listener = app.listen(3000, function () {
  console.log("The static server is listening on port " + listener.address().port);
});

// API
// https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?Stations=SHA,ORO,CLE,NML,SNL,DNP,BER&SensorNums=15&dur_code=M&Start=2022-04-01&End=2022-4-30
/***
Station       Code  Capacity
shasta  		  SHA   4552000
oroville 		  ORO   3537577
Trinity Lake 	CLE   2447650
New Melones   NML   2400000
san luis 		  SNL   2041000
Don Pedro  	  DNP   2030000
Berryessa  	  BER   1602000
***/
async function requestCurrentLakeWaterLevel(response, year, month) {
  // let string = 'ste${}sddf'
  let stationCode = 'SHA,ORO,CLE,NML,SNL,DNP,BER';
  let durCode = "M"
  let apiUrl = `https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?Stations=SHA,ORO,CLE,NML,SNL,DNP,BER&SensorNums=15&dur_code=M&Start=${year}-${month}-01&End=${year}-${month}-2`;
  console.log("year: ", year);
  console.log("year: ", month);
  console.log("url:", apiUrl);

  let data = await fetch(apiUrl);
  // Wait for origin server to send back JSON object
  let json = await data.json();
  // Sanity check the contents of the JSON
  console.log("THIS is json content", json);
  response.send(json);
}

// Import Required Modules
const fs = require("fs");
const xml2js = require("xml2js");
const MongoClient = require("mongodb").MongoClient;

// Read the XML Data
const xmlData = fs.readFileSync("./bookstore.xml");

// Use xml2js module to convert XML data to a JavaScript Object
const url = "mongodb://localhost:27017";
const client = new MongoClient(url, { useUnifiedTopology: true });

client.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Connected to MongoDB");
  }
});

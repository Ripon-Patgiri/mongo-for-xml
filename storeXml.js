// Import xml2js  library
const xml2js = require('xml2js');

// Read XML File and Parse it using 'xml2js' library
const fs = require('fs');

fs.readFile('movies.xml', (err, data) => {
  if (err) throw err;

  xml2js.parseString(data, (err, result) => {
    if (err) throw err;

    console.log(result);
  });
});

// Using JSON.stringify() to convert the object to a JSON Document
const json = JSON.stringify(result);

// Connect to a MongoDB Server
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'myproject';

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;

  console.log('Connected to MongoDB server');

  const db = client.db(dbName);

  // Perform operations on the database here

  client.close();
});

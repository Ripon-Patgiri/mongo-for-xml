// Import Required Modules
import { readFileSync } from "fs";
import { parseString } from "xml2js";
import { MongoClient } from "mongodb";

// Read the XML Data
const xmlData = readFileSync("./bookstore.xml");

// Use xml2js module to convert XML data to a JavaScript Object
const jsData = parseString(xmlData, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    return result;
  }
});

// Connect to MongoDB Database
const url = "mongodb://localhost:27017";
let client;
async function connectToDatabase() {
  client = new MongoClient(url);
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (err) {
    console.error(err);
  }
}
connectToDatabase();

// Insert Data into a Collection in Database
const db = client.db("adbd_project");
const collection = db.collection("adbd_xml");

collection.insertOne(jsData, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Data inserted into MongoDB");
  }
});

// Close Connection
client.close();
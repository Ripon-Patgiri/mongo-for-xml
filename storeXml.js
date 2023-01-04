// Import the MongoClient object from the mongodb library
const { MongoClient } = require("mongodb");
// Import the xml2js library
const xml2js = require("xml2js");
// Import the fs (file system) library
const fs = require("fs");

async function main() {
  // Connection URI for the MongoDB Database
  const uri =
    "mongodb+srv://ripon_p:ripon123@cluster0.zf3lzix.mongodb.net/?retryWrites=true&w=majority";
  // Create a new MongoClient object
  const client = new MongoClient(uri, {
    useNewUrlParser: true, // Use the new URL parser
    useUnifiedTopology: true, // Use the new server discovery and monitoring engine
  });
  try {
    // connect to the MongoDB Database
    await client.connect();

    // Read the XML File
    const xml = await fs.promises.readFile("movies.xml");
    // Parse the XML and convert it into a JavaScript Object.
    const obj = await xml2js.parseStringPromise(xml);

    //Get a reference to the collection where the data will be inserted
    const collection = client.db("adbd").collection("xml_movies");
    // Insert the data into the collection
    const result = await collection.insertOne(obj);
    // Check if the insertion was successful
    if (result.acknowledged === true) {
      console.log(
        `XML Document was successfully inserted with the _id: ${result.insertedId}`
      );
    } else {
      console.log("There was an error inserting the data into the database");
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

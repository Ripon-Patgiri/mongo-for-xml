const { MongoClient } = require("mongodb");
const xml2js = require("xml2js");
const fs = require("fs");

async function main() {
  const uri =
    "mongodb+srv://ripon_p:ripon123@cluster0.zf3lzix.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const xml = await fs.promises.readFile("movies.xml");
    const obj = await xml2js.parseStringPromise(xml);
    const collection = client.db("adbd").collection("xml_movies");
    const result = await collection.insertOne(obj);
    if (result.acknowledged === true) {
      console.log(`XML Document was successfully inserted with the _id: ${result.insertedId}`);
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

const { MongoClient } = require("mongodb");

async function main() {
  // Connection URI for the MongoDB Database
  const uri =
    "mongodb+srv://ripon_p:ripon123@cluster0.zf3lzix.mongodb.net/?retryWrites=true&w=majority";

  // Create a new MongoClient object
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to the MongoDB database
    await client.connect();

    // Get a reference to the collection
    const collection = client.db("adbd").collection("xml_movies");

    // const query = { "movies.movie.year" : "1994" };
    const cursor = collection.find();
    await cursor.forEach((result) => {
      result.movies.movie.forEach((answer) => {
        if(answer.year[0] === "1994") {
          console.log(answer.title[0]);
        }
      });
    });
  } catch (e) {
    console.error(e);
  } finally {
    // Close the connection to the MongoDB database
    await client.close();
  }
}

// Run the main function and catch any errors that may occur
main().catch(console.error);

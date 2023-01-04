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

    const cursor1 = collection.find();
    console.log("List of All Movies : ");
    await cursor1.forEach((result) => {
      result.movies.movie.forEach((answer) => {
        console.log(answer.title[0]);
      });
    });

    const cursor2 = collection.find();
    console.log("\nMovies Released in 1994 : ");
    await cursor2.forEach((result) => {
      result.movies.movie.forEach((answer) => {
        if (answer.year[0] === "1994") {
          console.log(answer.title[0]);
        }
      });
    });

    const cursor3 = collection.find();
    console.log("\nMovies directed by Christopher Nolan :");
    await cursor3.forEach((result) => {
      result.movies.movie.forEach((answer) => {
        if (answer.director[0] === "Christopher Nolan") {
          console.log(answer.title[0]);
        }
      });
    });

    const cursor4 = collection.find();
    console.log("\nMovies of the 'Drama' Genre :");
    await cursor4.forEach((result) => {
      result.movies.movie.forEach((answer) => {
        if (answer.genre[0].includes("Drama")) {
          console.log(answer.title[0]);
        }
      });
    });

    const cursor5 = collection.find();
    console.log("\nMovies starting with 'The' : ");
    await cursor5.forEach((result) => {
      result.movies.movie.forEach((answer) => {
        if (/^The/.test(answer.title[0])) {
          console.log(answer.title[0]);
        }
      });
    });

    const actorName = "Marlon Brando";
    const cursor6 = collection.find();
    console.log("\nMovies starring 'Marlon Brando' : ");
    await cursor6.forEach((result) => {
      result.movies.movie.forEach((answer) => {
        var actors = answer.actors[0].actor;
        for (var i = 0; i < actors.length; i++) {
          if (actors[i] === actorName) {
            console.log(answer.title[0]);
            break;
          }
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

//Import required Modules
const MongoClient = require("mongodb").MongoClient;

// Connect to MongoDB Database
const url = "mongodb://localhost:27017";
const client = new MongoClient(url, { useUnifiedTopology: true });

client.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Connected to MongoDB");
  }
});

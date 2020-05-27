const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let db;

exports.mongoConnect = (cb) => {
  MongoClient.connect(process.env.MONGODB_URL, {
    // to remove DepracationWarning
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((client) => {
      console.log("Connected Succesfully!");
      // client.db() a method within result from database name
      db = client.db("shop");
      cb();
    })
    .catch((err) => console.log("Error in mongoConnect: ", err));
};

exports.getDB = () => {
  if (db) {
    return db;
  } else {
    throw "No database found!";
  }
};

// FOR TESTING CONNECTION ONLY
// const mongoConnect = () => {
//   // a promise
//   MongoClient.connect(process.env.MONGODB_URL)
//     .then((client) => console.log(client))
//     .catch((err) => console.log(err));
// };

// module.exports = mongoConnect;

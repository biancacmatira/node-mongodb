const mongoDB = require("mongodb");

// import database from utils/database
const getDB = require("../util/database").getDB;

module.exports = class User {
  constructor(username, email) {
    this.username = username;
    this.iemail = email;
  }

  save() {
    const db = getDB();
    return db.collection("users").insertOne(this);
  }

  edit(id) {
    const db = getDB();
    return db
      .collection("users")
      .updateOne({ _id: new mongoDB.ObjectID(id) }, { $set: this });
  }

  static deleteById(id) {
    const db = getDB();
    return db.collection("users").deleteOne({ _id: new mongoDB.ObjectID(id) });
  }

  static fetchAll() {
    const db = getDB();
    return db.collection("users").find().toArray();
  }

  static findById(id) {
    const db = getDB();
    return db.collection("users").findOne({ _id: new mongoDB.ObjectID(id) });
  }
};

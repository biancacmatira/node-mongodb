const Cart = require("./cart");

const mongoDB = require("mongodb");

// import database from utils/database
const getDB = require("../util/database").getDB;

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    // this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // return db.execute(
    //   "INSERT INTO products(title, price, description, imageUrl) VALUES (?,?,?,?)",
    //   [this.title, this.price, this.description, this.imageUrl]
    // );

    const db = getDB();
    // usually: insertOne({title:title})
    // returns a promise that we can use in controller
    // we can reuse then & catch block
    return db.collection("products").insertOne(this);
  }

  edit(id) {
    // return db.execute(
    //   "UPDATE products SET title=?, price=?, description=?, imageUrl=? WHERE id=?",
    //   [this.title, this.price, this.description, this.imageUrl, this.id]
    // );

    const db = getDB();
    return db
      .collection("products")
      .updateOne({ _id: new mongoDB.ObjectID(id) }, { $set: this });
    // $set, special property
  }

  static deleteById(id) {
    // return db.execute("DELETE FROM products WHERE id=?", [id]);

    const db = getDB();
    return db
      .collection("products")
      .deleteOne({ _id: new mongoDB.ObjectID(id) });
  }

  static fetchAll() {
    // return db.execute("SELECT * from products");

    const db = getDB();
    // find returns a handle/cursor, not a promise
    // we cannot directly use just .find()
    // not best practice to use toArray() for large docs
    return db.collection("products").find().toArray();
  }

  static findById(id) {
    // return db.execute("SELECT * FROM products WHERE id=?", [id]);
    const db = getDB();
    // to fetch one object, we pass a JS object, to filter all
    // this returns a cursor
    // next() returns the last document match = actual query
    // _id => mongoDB field name for id
    // mongoDB BSON format (Object ID), so..
    // convert id (that we are receiving) to BSON
    // return db
    //   .collection("products")
    //   .find({ _id: new mongoDB.ObjectID(id) })
    //   .next();
    return db.collection("products").findOne({ _id: new mongoDB.ObjectID(id) });
  }
};

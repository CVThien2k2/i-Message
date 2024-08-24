"use strict";
const mongoose = require("mongoose");
require("dotenv").config();

class Database {
  constructor() {
    this.connect();
  }
  //connect
  connect(type = "mongodb") {
    // if (1 === 1) {
    //   mongoose.set("debug", true);
    //   mongoose.set("debug", { color: true });
    // }
    mongoose
      .connect(process.env.MONGODB_URI, {
        maxPoolSize: 50,
        dbName: "iMessage",
      })
      .then((_) => console.log("MongoDB Connected."))
      .catch((err) => console.log("Error Connect!"));
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;

const mongoose = require("mongoose");
const config = require("config");

module.exports = () => {
  const db = config.get("db");
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(console.log("Connected to database"))
    .catch((err) => console.log(new Error(err)));
};

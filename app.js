const express = require("express");
const mongoose = require("mongoose");
const app = express();
const config = require("config");
const cors = require("cors");
const users = require("./routes/users");
const auth = require("./routes/auth");
const posts = require("./routes/posts");
const comments = require("./routes/comments");

// Database Config
mongoose
  .connect("mongodb://localhost/instagram", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(console.log("Connected to database"))
  .catch((err) => console.log(new Error(err)));

let port = config.get("port");
app.listen(port, console.log(`Listening on port ${port}...`));

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/posts", posts);
app.use("/api/comments", comments);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

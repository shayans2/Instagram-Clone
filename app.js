const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const users = require("./routes/users");
const auth = require("./routes/auth");
const posts = require("./routes/posts");

// Database Config
mongoose
  .connect("mongodb://localhost/instagram", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log("Connected to database"))
  .catch((err) => console.log(new Error(err)));

let port = 4000;
app.listen(port, console.log(`Listening on port ${port}...`));

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/posts", posts);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

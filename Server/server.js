const express = require("express");
const mongoose = require("mongoose");

const user = require("./routes/api/user");

const app = express();

app.use(express.json());

//DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// User Route
app.use("/api/user", user);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

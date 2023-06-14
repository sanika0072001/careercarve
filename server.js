const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter=require('./routes/api/users');
const app = express();
// Bodyparser middleware

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use('/api',userRouter);
// DB Config
const db = require("./config/keys.js").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
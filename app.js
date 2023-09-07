const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const courseRoutes = require("./routers/course");
const studentRoutes = require("./routers/student");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

/************************************
 * @DESC    - DATABASE CONFIGURATION
 * @PACKAGE - mongoose
 ***********************************/
mongoose
  .connect(
    "mongodb+srv://dawoodhameed8:8DKgVLk1i3LPGqlI@cluster0.5enke19.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database Connected Successfully!!!", db);
  })
  .catch((err) => console.log("Error while connecting to the database" + err));
mongoose.set("debug", true);

app.use((request, response, next) => {
  response.header("Access-Control-Allowed-Origin", "*");
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Credentials", "true");
  response.header(
    "Access-Control-Allowed-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  response.header("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
  response.header("Pragma", "no-cache"); // HTTP 1.0.
  response.header("Expires", "0"); // Proxies.
  if (request.method === "OPTIONS") {
    response.header(
      "Access-Control-Allowed-Origin",
      "PUT, POST, PATCH, GET, DELETE"
    );
    return response.status(200).json({});
  }
  next();
});
app.use("/course", courseRoutes);
app.use("/students", studentRoutes);
app.get("/health", (req, res) => {
  return res.status(200).json("Health is good");
});

app.listen(3000, () => console.log(`Started Server on Port`, 3000));

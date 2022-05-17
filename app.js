const express = require("express");
const bodyParser = require("body-parser"); // TODO: Пойнять как работать с body pasrerer.

const Response = require("./response.js");

const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "data", "images"))); // statically serving all files from images folder

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Setting up routers
const uploadRouter = require("./routes/upload");
const downloadRouter = require("./routes/download");

app.use("/upload", uploadRouter);
app.use("/download", downloadRouter);

// Deafult Error handler
app.use((err, req, res, next) => {
  const code = err.statusCode || 500;
  const message = err.message;
  const data = err.data;

  const response = new Response(code, message, data);
  res.status(code).json(response);
});

app.listen(process.env.PORT || 8080);

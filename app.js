const express = require("express");
const bodyParser = require("body-parser"); // TODO: Пойнять как работать с body pasrerer.

const Response = require("./response.js");

const app = express();

// Setting up routers
const uploadRouter = require("./routes/upload");
const downloadRouter = require("./routes/download");

app.use("/upload", uploadRouter);
app.use("/download", downloadRouter);

// Deafult JSON Error handler
app.use((err, req, res, next) => {
  const code = err.statusCode || 500;
  const message = err.message;
  const data = err.data;

  const response = new Response(code, message, data);
  res.status(code).json(response);
});

app.listen(process.env.PORT || 8080);

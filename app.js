/**
 * @file app.js is the root file for this test case generator API
 *  @author Dewesh Jha
 *  @see <a href="https://deweshsoc.github.io/Portfoliov2">Dewesh</a>
 */

//node modules
const path = require("path");

require("dotenv").config();
const express = require("express");

//app settings
const app = express();

//routers
const serviceRoutes = require("./routes/service");

//configuration middlewares
app.use(express.json());

// cors error handling middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// route middlewares
// app.use('/auth',authRoutes);
app.use("/api", serviceRoutes);
//default route middleware
app.use("/", (req, res, next) => {
  const err = new Error("BAD REQUEST : invalid endpoint url");
  err.status = 400;
  throw err;
});

// error-handling
app.use((err, req, res, next) => {
  const error = {};
  if (!err.type) {
    error.status = err.status || 500;
    error.message = err.status ? err.message : "Some server error occured.";
  }
  res.status(err.status || 500).json({ error: error });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port, () => {
  console.log(`Server up at ${port}`);
});

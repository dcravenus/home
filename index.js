const proxy = require("express-http-proxy");
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;

express()
  .use("/tvmaze", proxy("http://api.tvmaze.com"))
  .use("/pixel-color", express.static(path.join(__dirname, "node_modules/pixel-color")))
  .use("/destijl", express.static(path.join(__dirname, "node_modules/destijl")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

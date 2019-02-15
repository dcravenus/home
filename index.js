const request = require("request-promise-native");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const proxy = require("express-http-proxy");
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;

express()
  //Proxies
  .use("/tvmaze", proxy("http://api.tvmaze.com"))

  .use("/pixel-color", express.static(path.join(__dirname, "node_modules/pixel-color")))
  .use("/destijl", express.static(path.join(__dirname, "node_modules/destijl")))
  .use("/react", express.static(path.join(__dirname, "node_modules/react")))
  .use("/react-dom", express.static(path.join(__dirname, "node_modules/react-dom")))

  .use("/components", express.static(path.join(__dirname, "components/build")))

  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .get("/movies", (req, res) => res.render("pages/movies"))

  .get("/omdb", (req, res) => {
    res.contentType("application/json");
    let url = `http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}`;
    Object.keys(req.query).forEach(key => {
      url = url + `&${key}=${req.query[key]}`;
    });

    request(url)
      .then(response => {
        res.send(response);
      })
      .catch(e => {
        res.send(e);
      });
  })

  .listen(PORT, () => console.log(`Listening on ${PORT}`));

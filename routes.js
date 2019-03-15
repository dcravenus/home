const express = require("express");
const proxy = require("express-http-proxy");
const path = require("path");

const getMovies = require("tomato-cli");

module.exports = function(app) {
  //Proxies
  app
    .use("/tvmaze", proxy("http://api.tvmaze.com"))

    .use("/pixel-color", express.static(path.join(__dirname, "node_modules/pixel-color")))
    .use("/destijl", express.static(path.join(__dirname, "node_modules/destijl")))
    .use("/react", express.static(path.join(__dirname, "node_modules/react")))
    .use("/react-dom", express.static(path.join(__dirname, "node_modules/react-dom")))

    .use("/components", express.static(path.join(__dirname, "components/build")))
    .use("/css", express.static(path.join(__dirname, "css")))

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
    });

  app.get("/tuesday-showtimes", function(req, res) {
    getMovies().then(movies => {
      res.json(movies);
    });
  });

  app.get("/tuesday", function(req, res) {
    res.render("pages/tuesday");
  });
};

var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

//Requiring models
var db = require("../models");

//Connecting to MongoDB
mongoose.connect(
    "mongodb://localhost/scraperHomework", { useNewUrlParser: true }
);


module.exports = function (app) {

    app.get("/", function (req, res) {
        res.render("index");
    })

    // scrape  
    app.get("/scrape", function (req, res) {

        axios.get("https://medium.com/topic/creativity").then(function (response) {

            // load response to cheerio
            var $ = cheerio.load(response.data);

            $("section").each(function (i, element) {


                var result = {};

                result.title = $(element)
                    .find("h3")
                    .text()
                result.summary = $(element)
                    .find("p")
                    .text()
                result.url = $(element)
                    .find("a")
                    .attr("href");

                db.Posts.create(result)
                    .then(function (newPost) {
                        // View the added result in the console
                        console.log(newPost);
                    })
                    .catch(function (err) {
                        // If an error occurred, send it to the client
                        return res.json(err);
                    });

            });

            res.send("Scrape complete!");
        });
    });

    // Route for getting all Articles from the db
    app.get("/posts", function (req, res) {
        // Grab every document in the Articles collection
        db.Posts.find({})
            .then(function (results) {
                // If we were able to successfully find Articles, send them back to the client
                res.render({ data: results });
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

};
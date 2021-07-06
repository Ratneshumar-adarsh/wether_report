const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
      res.sendFile(__dirname + "/index.html")
});


app.post("/", function (req, res) {
      console.log("post is recevied");

      const cityname = req.body.city;
      const apikey = "d04f9a25c46e87c3fb4b2c01e4437be4#"
      const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + apikey
      https.get(url, function (response) {
            console.log(response.statusCode);
            response.on("data", function (data) {
                  const d = JSON.parse(data);
                  // console.log(d);
                  // console.log(d.weather[0].description);
                  const icon = d.weather[0].icon;
                  const image_url = "http://openweathermap.org/img/wn/" + icon + "@2x.png"


                  res.write("<h1>the temp of the " + cityname + " is " + d.main.temp + " K / <h1>");
                  res.write("<h1>the description of weather in " + cityname + " is " + d.weather[0].description + "</h1>");
                  res.write("<img src=" + image_url + ">");
            });
            // res.send();

            // const object = {
            //       name: "ratnesh",
            //       lastname: "kumar"
            // }
            // o = JSON.stringify(object);
            // console.log(o);
      });

});
// app.get("/", function (req, res) {
//       const cityname = "chennai"
//       const apikey = "d04f9a25c46e87c3fb4b2c01e4437be4#"
//       const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + apikey
//       https.get(url, function (response) {
//             console.log(response.statusCode);
//             response.on("data", function (data) {
//                   const d = JSON.parse(data);
//                   // console.log(d);
//                   console.log(d.weather[0].description);
//                   const icon = d.weather[0].icon;
//                   const image_url = "http://openweathermap.org/img/wn/" + icon + "@2x.png"


//                   res.write("<h1>the temp of the siwan is " + d.main.temp + " K/<h1>");
//                   res.write("<h1>the description of weather in " + cityname + " is " + d.weather[0].description + "</h1>");
//                   res.write("<img src=" + image_url + ">");
//                   // res.send();

//                   // const object = {
//                   //       name: "ratnesh",
//                   //       lastname: "kumar"
//                   // }
//                   // o = JSON.stringify(object);
//                   // console.log(o);
//             });
//       });


// });



app.listen(3000, function () {
      console.log("port 3000 started");
});
const express = require("express"),
  app = express();
port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const hbs = require("hbs");
const path = require("path");

const weatherData = require("../utils/weatherData");

const publicStaticDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

mongoose
  .connect("mongodb://0.0.0.0:27017")
  .then(() => {
    app.listen(port, () => {
      console.info(
        `start server start listening on port http://localhost:${port}`
      );
    });
  })
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Wather App",
  });
});

//loaclhost:8080/weather?address=holon
app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({ error: "You must enter address in search text box" });
  }

  weatherData(address, (error, { temperature, description, cityName } = {}) => {
    if (error) {
      return res.send({ error });
    }
    console.log(temperature, description, cityName);
    res.send({ temperature, description, cityName });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "page not found",
  });
});

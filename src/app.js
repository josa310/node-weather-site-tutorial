const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const PUBLIC_DIR = path.join(__dirname, '../public');
const VIEWS_PATH = path.join(__dirname, "../templates/views");
const PARTIALS_PATH = path.join(__dirname, "../templates/partials");

const app = express();

app.set("view engine", "hbs");
app.set("views", VIEWS_PATH);
hbs.registerPartials(PARTIALS_PATH);

app.use(express.static(PUBLIC_DIR));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        message: "Index"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Us",
        message: "About"
    }); 
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Us",
        message: "Important message!"
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address)
    {
        return res.send({error: "Address not provided!"});
    }
    
    geocode(req.query.address, (error, {location, longitude, latitude} = {}) => {
        if (error)
        {
            return res.send({ error });
        }
        
        forecast(longitude, latitude, (error, forecastData) => {
            if (error)
            {
                return res.send({ error });
            }
            console.log(location);
            console.log(forecastData);

            res.send({
                location: [longitude, latitude],
                forecast: forecastData,
                address: location
            })
        });
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        message: "Important message!",
        errorMessage: "Article not found!"
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        message: "Important message!",
        errorMessage: "Page not found!"
    });
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000.")
});
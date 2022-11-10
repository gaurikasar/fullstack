const express = require("express");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 5002;

// Use Pug as the templating engine
app.set("views", __dirname + "/views");
app.set("view engine", "pug");

// REST Countries URL
const url = "https://restcountries.com/v3.1/all";
async function urlData(url) {
  try {
    let countriesResponse = await axios.get(url);
    if (countriesResponse.data == null) {
      console.error("No response was returned for the requested url!");
    } else {
      return countriesResponse.data;
    }
  } catch (error) {
    console.error("There is some error with the get operation: ", error);
  }
}
let apiData = urlData(url);

// Add your code here
app.get("/", (req, res) => {
  // render pug template for the index.html file

  res.render("index", {
    heading: "Countries of the World",
    main: "Welcome to this application. Using the REST Countries API, we will be showing the countries and capitals of the world, the most populous countries in the world, and the number of countries in each region of the world",
  });
});

app.get("/capitals", (req, res) => {
  // map the output array to create an array with country names and capitals
  // check for empty data in the output array
  let countries = [];
  apiData
    .then((response) => {
      response.map((answer) => {
        countries.push(answer.name.common + "-" + answer.capital);
      });
      countries.sort((name1, name2) => name1.localeCompare(name2));
      res.render("page", {
        heading: "Countries and Capitals",
        results: countries,
      });
    })
    .catch((error) => {
      console.log("In the catch block "+error);
    });
});

app.get("/populous", (req, res) => {
  // filter the output array for the countries with population of 50 million or more
  // sort the resulting array to show the results in order of population
  // map the resulting array into a new array with the country name and formatted population
  let populous = [];
  apiData.then((data) => {
    data.sort(function (first, second) {
      if (first.population > second.population) {
        return -1;
      }
      if (first.population < second.population) {
        return 1;
      }
      return 0;
    });
  });
  apiData
    .then((response) => {
      response.map((answer) => {
        if (answer.population > 50000000) {
          populous.push(answer.name.common + "-" + answer.population);
        }
      });
      res.render("page", {
        heading: "Countries and Capitals",
        results: populous,
      });
    })
    .catch((error) => {
      console.log("In the catch block"+error);
    });
});

app.get("/regions", (req, res) => {
  // reduce the output array in a resulting object that will feature the numbers of countries in each region
  // disregard empty data from the output array

  let regions = [];
  let regionData = new Map();
  apiData.then((data) => {
    data.sort((name1, name2) => name1.region.localeCompare(name2.region));
  });
  let regionname = [];
  let countCountry = [];

  apiData
    .then((response) => {
      response.map((answer) => {
        if (regionData.has(answer.region))
          regionData.set(answer.region, regionData.get(answer.region) + 1);
        else regionData.set(answer.region, 1);
      });
      regionData.forEach(function (value, key) {
        regions.push(key + "-" + value);
      });
      res.render("page", {
        heading: "Regions of the World",
        results: regions,
      });
    })
    .catch((error) => {
      console.log("In the catch block"+error);
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

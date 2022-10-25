/** Exercise 04 - API **/

const url = "https://restcountries.com/v3.1/all";
const ol = document.getElementById("results");
var finalResult = "";
// fetching data from the url and sorting it in ascending order
let getData = async () => {
  let resp = await fetch(url);

  if (resp.ok) {
    let data = await resp.json();
    data.sort((name1, name2) =>
      name1.name.common.localeCompare(name2.name.common)
    );
    data.forEach((country) => {
      finalResult +=
        "<li>" + country.name.common + " - " + country.population + "</li>";
    });
  } else {
    finalResult = "Invalid response code!";
  }
  ol.innerHTML = finalResult;
};

getData(url);

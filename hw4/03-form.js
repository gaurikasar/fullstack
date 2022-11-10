const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5001;

// Use middleware static() to serve all static files in the given folder
app.use(express.static("public"));

app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/form.html"));
});

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an objectß
app.use(express.urlencoded({ extended: false }));

// POST request
app.post("/submit", (req, res) => {
  // Add your code here
  console.log(req.body);
  console.log(`Name: ${req.body.name}`);
  console.log(`Email: ${req.body.email}`);
  res.write(`<br>Name:` + req.name + `</br>`);
  res.write(`<br>Email Id:` + req.email + `</br> `);
  let newsletterText = req.body.checkbox
    ? "Yes, Sign me up for newsletter."
    : "No, thank you.";
  let message = req.body.comments ? req.body.comments : "n/a";
  res.write(`<br>Comments:` + message + `</br> `);
  res.write(`<br>` + newsletterText + `</br> `);
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

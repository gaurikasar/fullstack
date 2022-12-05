const http = require("http");
const static = require("node-static");
const searchString = require("node:querystring");
const port = process.env.PORT || 5001;

const location = new static.Server("./public");
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/form") {
    location.serveFile("/form.html", 200, {}, req, res);
  } else if (req.method === "POST" && req.url === "/submit") {
    let filedata = "";
    req.on("data", (chunk) => {
      filedata += chunk;
    });
    req.on("end", () => {
      const userdata = searchString.parse(filedata);
      console.log(userdata);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`<br>Name:` + userdata.name + `</br>`);
      res.write(`<br>Email Id:` + userdata.email + `</br> `);
      let newsletterText = userdata.checkbox
        ? 'Yes, Sign me up for newsletter.'
        : 'No, thank you.';
      let message = userdata.comments ?
                    userdata.comments:
                    'n/a';
      res.write(`<br>Comments:` + message + `</br> `);
      res.write(`<br>` + newsletterText + `</br> `)
      res.end();
    });
  }
});

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

server.listen(port, () => {
  console.log(`Server running at form http://localhost:${port}`);
});

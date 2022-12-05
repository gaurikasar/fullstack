const express = require("express");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 5002;

// Add your code here

// Use the express-session module
app.use(
  session({
    store: new session.MemoryStore(),
    secret: "a secret to sign the cookie",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000,
    },
  })
);

app.get("/", (req, res) => {
  res.status(200);
  res.set({ "Content-Type": "text/plain" });
  req.session.example = [];
  req.session.example.push("/");
  res.send("Currently on home route / \n");
});
app.get("/:character", (req, res) => {
  res.status(200);
  res.set({ "Content-Type": "text/plain" });
  let current = "Currently on route: " + req.url + "\n";
  //res.send(req.session.example);
  let ans = "Previously Visited";
  //res.send('Previously visited');
  req.session.example.forEach((element) => {
    ans += element + "\n";
  });
  req.session.example.push(req.url);
  res.send(current + ans);
  console.log(req.session.example);
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

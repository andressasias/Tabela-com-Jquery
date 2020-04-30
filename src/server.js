const express = require("express");
const app = express();
const port = 3000;

const data = require("./server.json");

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static('public'))

app.get("/", (req, res) => res.render("index.ejs"));
app.get("/api/encomendas", (req, res) => res.json(data));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
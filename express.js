var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var app = express();

app.get("/", function(req, res) {
  res.send("Hello World!");
});

var server = app.listen(3000, function() {
  console.log("Server running at http://localhost:" + server.address().port);
});

app.use(bodyParser.json());

app.post("/calculation/:name", function(req, res) {
  try {
    fs.writeFileSync(
      "./calculate-" + req.params.name + ".json",
      JSON.stringify(req.body)
    );
    res.send({ success: true });
  } catch (error) {
    res.send({ success: false });
  }
});

app.get("/calculation/:name", function(req, res) {
  try {
    const contents = fs.readFileSync(
      "./calculate-" + req.params.name + ".json"
    );
    res.send(JSON.parse(contents.toString()));
  } catch (error) {
    res.send({ success: false });
  }
});

app.delete("/calculation/:name", (req, res) => {
  try {
    fs.unlinkSync("./calculate-" + req.params.name + ".json");
    res.send({ success: true });
  } catch (error) {
    res.send({ success: false });
  }
});

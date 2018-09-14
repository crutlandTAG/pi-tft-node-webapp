const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { screen, Colors } = require("./lib/screen");

const app = express();

function setupMiddleware() {
  console.log("setting up expressjs middleware");
  app.use(express.static(`${__dirname}/wwwroot`));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
}

function setupRoutes() {
  console.log("setting up expressjs routes");

  app.get("/api/helloWorld", (req, res) => {
    res.json({ "message": "Hello World!" });
  });

  app.post("api/color", (req, res) => {
    let color = req.body.color;
    if (!color) color = Colors.black;
    screen.setBackgroundColor(color);
    res.sendStatus(200);
  })

  app.post("api/displayMessage", (req, res) => {
    let message = req.body.message;
    if (!message) message = "No Message Provided.";
    screen.printText(`Message: ${message}`, Colors.black, Colors.blue);
    setTimeout(() => screen.printText("Waiting..."), 3000);
    res.sendStatus(200);
  });

  app.get("*", (req, res) => {
    const index = path.resolve(__dirname, "index.html");
    res.sendFile(index);
  })
}

function setupServer() {
  console.log("starting expressjs server");
  app.listen(80, () => {
    console.log("listening on Port 80");
  });
}

setupMiddleware();
setupRoutes();
setupServer();
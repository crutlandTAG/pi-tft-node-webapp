const app = require("express")();
const bodyParser = require("body-parser");
const { screen, Colors } = require("./lib/screen");

function setupMiddleware() {
  console.log("setting up expressjs middleware");
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
}

function setupRoutes() {
  console.log("setting up expressjs routes");
  app.get("/", (req, res) => {
    res.json({"message": "hello-world"});
  });

  app.post("/colors", (req, res) => {
    let color = req.body.color;
    if(!color) color = "#FF0000";
    screen.setBackgroundColor(color);
    res.sendStatus(200);
  })

  app.post("/", (req, res) => {
    let message = req.body.message;
    if(!message) message = "No Message Provided.";
    screen.printText(`Message: ${message}`, Colors.black, Colors.red);
    setTimeout(() => screen.printText("Waiting..."), 3000);
    res.sendStatus(200);
  });  
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
const express = require("express");
const app = express();
const port = 3000;
const session = require("express-session");

app.use(
  session({
    secret: "secretsessionkey",
    resave: true,
    saveUninitialized: true,
  })
);

// Specify the view engine
app.set("view engine", "ejs");
app.use("/static", express.static("public"));

// Function to get the homepage and send response
// app.get takes two parameters, the path,
// and the function with parameters: request-response-next(optional)

// res functions:
// res.sendStatus(300)
// res.status(500).send("Failed")
// res.status(500).json({message: "Failed"})
// res.download("<path of file to download>")
// res.render("<html file>")
app.get("/", (req, res) => {
  res.render("index", { data: "New data" });
});

// Define the router file and set the router prefix
const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

const queryRoutes = require("./routes/query");
app.use("/query", queryRoutes);

const voteRoutes = require("./routes/vote");
app.use("/vote", voteRoutes);

app.listen(port, () => console.log(`App listening on port ${port}!`));

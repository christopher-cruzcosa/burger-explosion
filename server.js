//dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const routes = require("./controllers/controller.js");

//paths
const path = require("path");
const PORT = process.env.PORT || 8080;
const db = require("./models");

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//handlebars setup
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, "public/views"));

//api routes and static files
app.use(routes);
app.use(express.static("public"));

//begin sequelize and the server
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on PORT ${ PORT}`);
    });
  });
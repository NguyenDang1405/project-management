const express = require("express");
const database = require("./config/database");
require("dotenv").config();
const methodOverride = require("method-override");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require("express-flash");
const route = require("./routes/clients/index.routes");
const routeAdmin = require("./routes/admin/index.route");
const systemAdmin = require("./config/system");

database.connect();
const app = express();
const port = process.env.port;
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }))


// app.use(bodyParser.json())
app.use(express.static("public"));
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.set("views", "./views");
app.set("view engine", "pug");
app.locals.prefixAdmin = systemAdmin.prefixAdmin;

route(app);
routeAdmin(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

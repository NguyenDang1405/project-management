const express = require('express');
const database = require("./config/database")
require("dotenv").config();
const route = require("./routes/clients/index.routes");
const routeAdmin = require("./routes/admin/index.route");
const systemAdmin = require("./config/system")


database.connect();
const app = express()
const port = process.env.port

app.set('views', './views');
app.set('view engine', 'pug'); 
app.locals.prefixAdmin = systemAdmin.prefixAdmin;
app.use(express.static('public'))

route(app);
routeAdmin(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

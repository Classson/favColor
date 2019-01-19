const express = require('express');
const morgan = require('morgan');
const Sequelize = require('sequelize');
const routes = require('./content/index')

const app = express();
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

//what is happening on this line
app.use("/", require("./content/index"));

let PORT = 3000;
app.listen(PORT, () => {
  console.log('alex is the best')
});

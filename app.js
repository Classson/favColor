const express = require('express');
const morgan = require('morgan');
const Sequelize = require('sequelize');

const app = express();

app.use(morgan('dev'));


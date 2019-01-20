const express = require('express');
const morgan = require('morgan');
const routes = require('./content/index');
const data = require('./data');
const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

//what is happening on this line
app.use("/", require("./content/index"));

let PORT = 3000;

const init = async () => {
  await data.db.sync()
  .then(console.log('works'))
  .catch(err => { console.log(err.stack)})

  app.listen(PORT, () => {
    console.log('listening')
  });
}

init();

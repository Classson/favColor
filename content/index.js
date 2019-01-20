
const router = require('express').Router();
const express = require('express')
const bodyParser = require('body-parser');
const html = require("html-template-tag");
const { db, User } = require('../data');
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: false }));

//why does this need to be above get
router.post('/', (req, res, next) => {
  let name = req.body.name;
  let color = req.body.color;
  let user = new User ({
    name: name,
    color: color
  })
  try {
    user.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try{
    const users = await User.findAll();
    console.log(users.body);

    res.send( html`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="/style.css" />
      <title>What's Your Favorite Color?</title>
    </head>
    <body>
      <h1>What's Your Favorite Color?</h1>
      <form method="POST" action="/">
        <label>Your Name</label>
        <input name='name' type='text'>
        <label>Your Favorite Color</label>
        <input name='color' type="color">
        <button type=submit>submit</button>
      </form>
      <div id='allUsers'>
      <ul class="list-unstyled">
    <ul>
    ${users.map(user => html`<li><p>${user.name}</p></li>`)}
    </ul>
  </ul>
      </div>
    </body>
    </html>`)
  }
  catch(error){ next(error) }
})




module.exports = router;

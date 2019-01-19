
const router = require('express').Router();
const express = require('express')
const bodyParser = require('body-parser');
const html = require("html-template-tag");
router.use(express.urlencoded({ extended: false }));

router.post('/', (req, res, next) => {
  try {
    let name = req.body.name;
    let color = req.body.color;
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/', (req, res, next) => {
  try{
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
    </body>
    </html>`)
  }
  catch(error){ next(error) }
})




module.exports = router;

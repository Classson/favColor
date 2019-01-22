const router = require('express').Router();
const express = require('express');
const bodyParser = require('body-parser');
const html = require('html-template-tag');
const EventEmitter = require('events');
const { db, User } = require('../data');
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: false }));




router.get('/:name/edit', async (req, res, next) => {
  try {
    const editName = req.params.name;
    const user = await User.findOne({
      where: {
        name: editName
      }
    })
    const editColorStyle = `border: solid 3px ${user.color}`;
    res.send(html`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <link rel="stylesheet" href="/style.css" />
          <title>What's Your Favorite Color?</title>
        </head>
        <body>
          <h1>Edit ${editName}</h1>
          <form id="editForm" method="POST" style="${editColorStyle}"
action="/${editName}/edit">
          <div class ='form-el'>
            <label>What's ${editName}'s New Favorite Color?</label>
            <input name="color" type="color" />
            <button id ="update" type="submit">Update</button>
          </div>
          <div class ='form-el'>
            <label id="deleteLab">Actually, ${editName} is forever evolving and cannot be pinned down. Just delete them from this database.</label><br><br>
            <a href="/${editName}/delete" id="delete">Delete</a>
          </div>
          </form>
        </body>
      </html>
    `);
  } catch (error) {
    next(error);
  }
});


router.post ('/:name/edit', async (req, res, next) => {
  try {
    const editName = req.params.name;
    const newColor = req.body.color;
    const user = await User.findOne({
      where: {
        name: editName
      }
    })
    const updatedUser = await user.update({
      color: newColor
    })

    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/:name/delete', async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        name: req.params.name
      }
    })
    res.redirect('/')
  }
  catch (error){ next(error)}

});


//why does this need to be above get
router.post('/', async (req, res, next) => {
  let name = req.body.name;
  let color = req.body.color;
  let user =  await new User({
    name: name,
    color: color,
  });
  try {
     await user.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.send(html`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <link rel="stylesheet" href="/style.css" />
          <title>What's Your Favorite Color?</title>
        </head>
        <body>
          <h1>What's Your Favorite Color?</h1>
          <form method="POST" action="/">
          <div class ='form-el'>
            <label>Your Name</label> <input name="name" type="text" />
          </div>
          <div class ='form-el'>
            <label>Your Favorite Color</label>
            <input name="color" type="color" />
          </div>
            <button type="submit">submit</button>
          </form>
          <div id="allUsers">
            <ul class="list-unstyled">
              ${users.map(user => html`<li><p class="name" id=${user.color}>${user.name}</p><a class="edit" href="/${user.name}/edit">edit</a></li>`)}
            </ul>
          </div>
        </body>
        <script type="text/javascript" src="/script.js"></script>
      </html>
    `);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

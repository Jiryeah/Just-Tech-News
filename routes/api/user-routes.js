const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
  // Access our User model and run .findAll() method)
  //* find.All() is the JS equivalent of SQL SELECT * FROM user;.
  User.findAll({
    //* password is within an array to allow us to add more password columns as we go
    attributes: { exclude: [`password`] }
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
  //* findOne() w/ 'where' identifier, is the JS equivalent of SQL
  //* SELECT * FROM users WHERE id = 1;.
  User.findOne({
    attributes: { exclude: [`password`] },
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// POST /api/users
router.post('/', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  //* creat() methods allows use to insert data; similar to SQL
  //* INSERT INTO users (username, email, password)
  //* VALUES ('Lernantino', 'lernantino@gmail.com', 'password1234').
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  //* update() method combines the parameters for creating data & looking up data.
  //* We pass req.body to provide the new data we want to use in the update & req.params.id to indicate where exactly we want that new data to be used.
  //* SQL equivalent = UPDATE users SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234" WHERE id = 1;.
  User.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData[0]) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
  //* destroy() method w/ 'where' identifier, allows us to delete the specified data.
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;


//* API Architectural Pattern REST = REpresentational State Transfer.
//* APIs built following this pattern as what's known as RESTful APIs
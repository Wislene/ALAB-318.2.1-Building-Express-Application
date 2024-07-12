const express = require('express');
const path = require('path');
const router = express.Router();

// Sample user data
const users = [
  { userId: 1, username: 'john', age: 32, occupation: 'Painter' },
  { userId: 2, username: 'louis', age: 30, occupation: 'Lawyer' },
  { userId: 3, username: 'sally', age: 25, occupation: 'StockTrader' },
];

// Route to display a form to create a new user
router.get('/create', (req, res) => {
  res.render('createUser', { title: 'Create User' });
});

// Route to handle the form submission
router.post('/create', (req, res) => {
  const { username, age, occupation } = req.body;
  const newUserId = users.length + 1;
  const newUser = { userId: newUserId, username, age: parseInt(age), occupation };
  users.push(newUser);
  res.redirect(`/users/${newUserId}`);
});

// Route to display user profile based on userId
router.get('/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find(u => u.userId === userId);
  if (user) {
    res.render('user', { title: 'User Profile', user });
  } else {
    res.status(404).send('User not found');
  }
});

// Download user data route
router.get('/download', (req, res) => {
  const file = path.join(__dirname, '../public/files/user-data.txt');
  res.download(file, 'user-data.txt');
});

module.exports = router;


const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const users = require('../data/users');

// Download user data route
router.get('/download', (req, res) => {
  const filePath = path.join(__dirname, '../data/files/user-data.txt');
  let data = '';

  for (const user of users) {
    data += `UserName: ${user.username}\n`;
    data += `userId: ${user.userId}\n`;
    data += `Age: ${user.age}\n`;
    data += `Occupation: ${user.occupation}\n\n`;
  }

  fs.writeFileSync(filePath, data);

  res.download(filePath, 'user-data.txt', (err) => {
    if (err) {
      res.status(500).send('Error downloading file');
    } else {
      fs.unlinkSync(filePath); 
    }
  });
});

module.exports = router;

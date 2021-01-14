const express = require('express');
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  console.log('This is working');
});

app.listen(3000);

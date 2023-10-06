const express = require('express');
require('dotenv').config();

const app = express();

const port = process.env.PORT;
const API_KEY = process.env.API_KEY;

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}/`);
    console.log(API_KEY)
});
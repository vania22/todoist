const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

const authRoutes = require('./routes/auth');

mongoose
    .connect('mongodb://localhost/todoist', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    })
    .then(() => console.log('Connected to database'));

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(authRoutes);

app.listen(3000, () => {
    console.log('Server started');
});

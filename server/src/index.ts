import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';

const app = express();

import authRoutes from './routes/auth';
import listRoutes from './routes/list';
import taskRoutes from './routes/task';

mongoose
    .connect('mongodb://localhost/todoist', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log('Connected to database'));

app.use(morgan('combined'));
app.use(bodyParser.json());

app.use(authRoutes);
app.use(listRoutes);
app.use(taskRoutes);

app.listen(3000, () => {
    console.log('Server started');
});

import { myDataSource } from './database/dataSource';
import express from 'express';

const app = express()
app.use(express.json())

myDataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });

app.listen(3000)
import DataSourceSingleton from './database/DataSourceSingleton';
import express from 'express';
import router from './routes/indexRouter';

const myDataSource = DataSourceSingleton.getInstance();

const app = express()
app.use(express.json())
router(app);

myDataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });

app.listen(3000)
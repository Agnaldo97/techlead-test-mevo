import express from 'express';
import sequelize from './database/sequelize';
import mevoRoutes from './routes/index';
import 'reflect-metadata';
import { Config } from './config'

const app = express();
const PORT = Config.PORT || 3000;

app.use(express.json());

app.use(mevoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

// sequelize.sync().then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server is running at http://localhost:${PORT}`);
//     });
// });
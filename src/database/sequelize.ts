import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  database: 'Task',
  host: 'localhost',
  username: 'postgres',
  password: 'pass',
  dialect: 'mysql', // or 'mysql' for MySQL
  //Specify the path to your models
  // Add each model to the sequelize instance
  models: [__dirname + '/models'],
});

export default sequelize;
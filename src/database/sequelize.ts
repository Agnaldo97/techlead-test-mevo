import { Sequelize } from 'sequelize-typescript';
import ENV from '../properties';
const sequelize = new Sequelize({
  database: ENV.DATABASE.MEVO.NAME,
  host: ENV.DATABASE.MEVO.HOST,
  username: ENV.DATABASE.MEVO.USERNAME,
  password: ENV.DATABASE.MEVO.PASSWORD,
  dialect: 'mysql',
  models: [__dirname + '/models'],
  define: {
    timestamps: false
  }
});

export default sequelize;
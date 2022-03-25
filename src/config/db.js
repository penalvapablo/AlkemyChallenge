import { Sequelize,  } from 'sequelize';
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'src/sqlite/database.sqlite',
  logging: false,
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}



export default sequelize
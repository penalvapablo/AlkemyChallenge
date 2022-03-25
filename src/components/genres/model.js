import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';

const Genre = sequelize.define('Genre', {
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{timestamps:false});

// Genre.drop()

export default Genre;

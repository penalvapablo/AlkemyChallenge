import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';

const Movie = sequelize.define('Movie', {
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  codename:{
    type: DataTypes.STRING,
    allowNull: false,
  }
},{timestamps:false});

// Movie.drop()

export default Movie;

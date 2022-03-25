import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';

const Character = sequelize.define('Character', {
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  history: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codename:{
    type: DataTypes.STRING,
    allowNull: false,
  }
},
{timestamps:false});

// Character.drop()

export default Character;

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const CharacterMovie = sequelize.define('CharacterMovie',{
  characterId: DataTypes.INTEGER,
  movieId: DataTypes.INTEGER
},
{ timestamps: false })

export default CharacterMovie
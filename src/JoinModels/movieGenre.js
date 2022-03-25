import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const MovieGenre = sequelize.define('MovieGenre',{
  genreId: DataTypes.INTEGER,
  movieId: DataTypes.INTEGER
},
{ timestamps: false })

export default MovieGenre
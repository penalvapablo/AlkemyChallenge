import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import config from './config/index.js';
import routes from './routes/index.js';
import sequelize from './config/db.js';

import Character from './components/characters/model.js';
import Movie from './components/movies/model.js';
import Genre from './components/genres/model.js'
import CharacterMovie from './JoinModels/characterMovie.js';
import MovieGenre from './JoinModels/movieGenre.js'
import User from './components/users/model.js';

Character.belongsToMany(Movie, { through: CharacterMovie });
Movie.belongsToMany(Character, { through: CharacterMovie });
Movie.belongsToMany(Genre, { through: MovieGenre });
Genre.belongsToMany(Movie, { through: MovieGenre });



/**
 * PRUEBAS
 */


/**
 * -------------- GENERAL SETUP ----------------
 */
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors(`${config.cors}`));
app.use(express.urlencoded({ extended: true }));

// Global variables
const PORT = config.port;

// Rutas
routes(app);

// Movie.destroy({where:{}})
// Character.destroy({where:{}})
// MovieGenre.destroy({where:{}})
// CharacterMovie.destroy({where:{}})
// Genre.destroy({where:{}})
// User.destroy({where:{}})


await sequelize.sync();

app.listen(PORT, () => {
  console.log(`Servidor inicializado en el puerto ${PORT}`);
});

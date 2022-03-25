import Character from './model.js';
import Movie from '../movies/model.js';
import CharacterMovie from '../../joinModels/characterMovie.js';

class charactersDao {
  async getAll(queries) {
    try {
      const { name, age, movie, weight } = queries;
      const characterFilters = {};
      const movieFilters = {};
      if (name) {
        characterFilters.codename = name;
      }
      if (age) {
        characterFilters.age = age;
      }
      if (weight) {
        characterFilters.weight = weight;
      }
      if (movie) {
        movieFilters.id = movie;
        const characters = await Character.findAll({
          attributes: ['id', 'name', 'image'],
          where: characterFilters,
          include: [
            {
              model: Movie,
              where: movieFilters,
              attributes: [],
            },
          ],
        });

        return characters;
      }

      const characters = await Character.findAll({
        attributes: ['id', 'name', 'image'],
        where: characterFilters,
      });

      return characters;
    } catch (error) {
      console.log(`error al buscar los personajes en la db . ${error}`);
    }
  }

  async get(id) {
    try {
      return await Character.findByPk(id, {
        include: [
          {
            model: Movie,
            attributes: ['id', 'title'],
            through: {
              attributes: [],
            },
          },
        ],
      });
    } catch (error) {
      console.log(`error al buscar el personaje en la db . ${error}`);
    }
  }

  async create(newCharacterData) {
    try {
      // Check if already exists
      const exist = await Character.findOne({
        where: { name: `${newCharacterData.name}` },
      });
      if (exist)
        return {
          error: `character already registered: ${newCharacterData.name}`,
        };

      // Create codename for query by name -> el rey leon = elreyleon
      const codename = newCharacterData.name.split(' ').join('');
      newCharacterData.codename = codename;

      // Create new character
      const newCharacter = await Character.create(newCharacterData);

      //Associate movies
      if (newCharacterData.moviesId && newCharacterData.moviesId.length > 0) {
        const moviesId = newCharacterData.moviesId;
        moviesId.forEach(async (movieID) => {
          let movie = await Movie.findByPk(movieID);
          await newCharacter.addMovie(movie);
        });
      }

      return newCharacter;
    } catch (error) {
      console.log(`error al crear el personaje en la db. ${error}`);
    }
  }

  async update(id, newData) {
    try {
      //Check if exists
      let updatedCharacter = await Character.findByPk(id);
      if (!updatedCharacter) return;

      // Update codename for query by name -> el rey leon = elreyleon
      const codename = newData.name.split(' ').join('');
      newData.codename = codename;

      await Character.update(newData, { where: { id: `${id}` } });

      // Remove movies from character
      await CharacterMovie.destroy({
        where: {
          characterId: id,
        },
      });

      //Associate movies
      if (newData.moviesId && newData.moviesId.length > 0) {
        const moviesId = newData.moviesId;
        moviesId.forEach(async (movieID) => {
          let movie = await Movie.findByPk(movieID);
          await updatedCharacter.addMovie(movie);
        });
      }
      return updatedCharacter;
    } catch (error) {
      console.log(`error al actualizar el personaje en la db. ${error}`);
    }
  }

  async delete(id) {
    try {
      return await Character.destroy({ where: { id: `${id}` } });
    } catch (error) {
      console.log(`error al borrar el personaje de la db . ${error}`);
    }
  }
}

export default new charactersDao();

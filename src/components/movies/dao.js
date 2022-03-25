import Character from '../characters/model.js';
import Movie from './model.js';
import CharacterMovie from '../../JoinModels/characterMovie.js';
import Genre from '../genres/model.js';
import MovieGenre from '../../JoinModels/movieGenre.js';

class moviesDao {
  async getAll(queries) {
    try {
      const { title, genre, order } = queries;
      const movieFilters = {};
      if (title) {
        movieFilters.codename = title;
      }
      // Ascendent order by Id as default
      let orderFilter = ['id', 'ASC'];

      if (order) {
        const casedOrder = order.toUpperCase();
        if (casedOrder === 'ASC' || casedOrder === 'DESC') {
          orderFilter = ['year', order];
        } else {
          return { error: 'invalid order. Must be ASC or DESC' };
        }
      }

      let movies;

      //Filter by genre
      if (genre) {
        const genreFilters = {};
        genreFilters.id = genre;
        movies = await Movie.findAll({
          attributes: ['id', 'title', 'image', 'year'],
          where: movieFilters,
          order: [orderFilter],
          include: [
            {
              model: Genre,
              where: genreFilters,
              attributes: [],
            },
          ],
        });
        return movies;
      }

      movies = await Movie.findAll({
        attributes: ['id', 'title', 'image', 'year'],
        where: movieFilters,
        order: [orderFilter],
      });

      return movies;
    } catch (error) {
      console.log(`error al buscar las películas en la db . ${error}`);
    }
  }

  async get(id) {
    try {
      return await Movie.findByPk(id, {
        include: [
          {
            model: Character,
            attributes: ['id', 'name'],
            through: {
              attributes: [],
            },
          },
          {
            model: Genre,
            attributes: ['id', 'name'],
            through: {
              attributes: [],
            },
          },
        ],
      });
    } catch (error) {
      console.log(`error al buscar la película en la db . ${error}`);
    }
  }

  async create(newMovieData) {
    try {
      // Check if already exists
      const exist = await Movie.findOne({
        where: { title: `${newMovieData.title}` },
      });
      if (exist)
        return { error: `movie already registered: ${newMovieData.title}` };

      // Update codename for query by name -> el rey leon = elreyleon
      const codename = newMovieData.title.split(' ').join('');
      newMovieData.codename = codename;
      const newMovie = await Movie.create(newMovieData);

      // associate movies
      if (newMovieData.charactersId && newMovieData.charactersId.length > 0) {
        const charactersId = newMovieData.charactersId;
        charactersId.forEach(async (characterId) => {
          let character = await Character.findByPk(characterId);
          await newMovie.addCharacter(character);
        });
      }
      // associate genres
      if (newMovieData.genresId && newMovieData.genresId.length > 0) {
        const genresId = newMovieData.genresId;
        genresId.forEach(async (genreId) => {
          let genre = await Genre.findByPk(genreId);
          await newMovie.addGenre(genre);
        });
      }

      return newMovie;
    } catch (error) {
      console.log(`error al crear la película en la db. ${error}`);
    }
  }

  async update(id, newData) {
    try {
      // Update codename for query by name -> el rey leon = elreyleon
      const codename = newData.title.split(' ').join('');
      newData.codename = codename;
      await Movie.update(newData, { where: { id: `${id}` } });

      // Remove characters and genres from movies
      await CharacterMovie.destroy({
        where: {
          movieId: id,
        },
      });
      await MovieGenre.destroy({
        where: {
          movieId: id,
        },
      });
      const updatedMovie = await Movie.findByPk(id);

      //Update codename
      updatedMovie.codename = updatedMovie.title.split(' ').join('');

      // Associate Movies
      if (newData.charactersId && newData.charactersId.length > 0) {
        const charactersId = newData.charactersId;
        charactersId.forEach(async (characterId) => {
          let character = await Character.findByPk(characterId);
          await updatedMovie.addCharacter(character);
        });
      }

      //Associate Genres
      if (newData.genresId && newData.genresId.length > 0) {
        const genresId = newData.genresId;
        genresId.forEach(async (genreId) => {
          let genre = await Genre.findByPk(genreId);
          await updatedMovie.addGenre(genre);
        });
      }
      return updatedMovie;
    } catch (error) {
      console.log(`error al actualizar la películaen la db. ${error}`);
    }
  }

  async delete(id) {
    try {
      return await Movie.destroy({ where: { id: `${id}` } });
    } catch (error) {
      console.log(`error al borrar la película de la db . ${error}`);
    }
  }
}

export default new moviesDao();

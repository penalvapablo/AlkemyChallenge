import moviesDao from './dao.js';

class MoviesController {
  async getMovies(req, res) {
    try {
      const movies = await moviesDao.getAll(req.query);
      res.status(200).json(movies);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error_description: 'Server error.' });
    }
  }

  async getMovie(req, res) {
    try {
      const { id } = req.params;
      const movie = await moviesDao.get(id);
      if (!movie)
        return res.status(404).json({ error_description: 'Movie not found' });
      res.status(200).json(movie);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error_description: 'Server error.' });
    }
  }

  async createMovie(req, res) {
    try {
      const data = req.body;
      if (
        !(data.image.length > 0) ||
        !(data.title.length > 0) ||
        !Number(data.year).length === 4 ||
        !Number(data.rate)
      ) {
        return res.status(400).json({ error_description: 'missing data.' });
      }

      const newMovie = await moviesDao.create(data);

      if (newMovie.error)
        return res.status(400).json({ error: newMovie.error });

      return res.status(201).json({ message: 'movie registered' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error_description: 'Server error.' });
    }
  }

  async updateMovie(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (
        !(data.image.length > 0) ||
        !(data.title.length > 0) ||
        !Number(data.year).length === 4 ||
        !Number(data.rate)
      ) {
        return res.status(400).json({ error_description: 'missing data.' });
      }
      await moviesDao.update(id, data);
      const newMovie = await moviesDao.get(id);

      if (!newMovie)
        return res.status(404).json({ error_description: 'Movie not found' });
      return res.status(200).json({ message: 'movie updated' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error_description: 'Server error.' });
    }
  }

  async deleteMovie(req, res) {
    const response = await moviesDao.delete(req.params.id);

    if (response === 0)
      return res.status(400).json({ error_description: 'Movie not found.' });

    res.status(200).json({message: 'movie deleted'});

    try {
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error_description: 'Server error.' });
    }
  }
}

export default new MoviesController();

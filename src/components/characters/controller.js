import charactersDao from './dao.js';

class CharacterController {
  async getCharacters(req, res) {
    try {
      const queries = req.query;
      const characters = await charactersDao.getAll(queries);
      res.status(200).json(characters);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error_description: 'Server error.' });
    }
  }

  async getCharacter(req, res) {
    try {
      const { id } = req.params;
      const character = await charactersDao.get(id);
      if (!character)
        return res
          .status(404)
          .json({ error_description: 'Character not found.' });
      res.status(200).json(character);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error_description: 'Server error.' });
    }
  }

  async createCharacter(req, res) {
    try {
      const data = req.body;
      if (
        !(data.image.length > 0) ||
        !(data.name.length > 0) ||
        !Number(data.age) ||
        !Number(data.weight) ||
        !(data.history.length > 0)
      ) {
        return res.status(400).json({ error_description: 'missing data.' });
      }

      const newCharacter = await charactersDao.create(req.body);

      if (newCharacter.error)
        return res.status(400).json({ error: newCharacter.error });

      return res.status(201).json({ message: 'character registered' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error_description: 'Server error.' });
    }
  }

  async updateCharacter(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (
        !(data.image.length > 0) ||
        !(data.name.length > 0) ||
        !Number(data.age) ||
        !Number(data.weight) ||
        !(data.history.length > 0)
      ) {
        return res.status(400).json({ error_description: 'missing data.' });
      }

      const newCharacter = await charactersDao.update(id, data);

      if (!newCharacter)
        return res
          .status(404)
          .json({ error_description: 'Character not found' });

      return res.status(200).json({ message: 'character updated' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error_description: 'Server error.' });
    }
  }

  async deleteCharacter(req, res) {
    if (isNaN(req.params.id)) {
      return res.status(400).json({ error: 'invalid ID' });
    }
    const response = await charactersDao.delete(req.params.id);

    if (response === 0)
      return res
        .status(404)
        .json({ error_description: 'character not found.' });

    res.status(200).json({ message: 'character deleted' });

    try {
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error_description: 'Server error.' });
    }
  }
}

export default new CharacterController();

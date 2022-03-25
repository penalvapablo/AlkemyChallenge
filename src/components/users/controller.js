import userDao from './dao.js';
import generateToken from './utils/generateToken.js';
import signUpEmail from './utils/signUpEmail.js';

class UsersController {
  async register(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ error: 'missing data' });
        return;
      }
      await userDao.createUser(email, password);
      signUpEmail(email);
      res.status(201).json({ message: 'user created' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error_description: 'Server error' });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ error: 'missing data' });
        return;
      }
      const user = await userDao.getUser(email, password);
      if (user.error) return res.status(404).json(user);
      const accessToken = await generateToken(user);

      res.status(201).json({ accessToken });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error_description: 'Server error.' });
    }
  }
}

export default new UsersController();

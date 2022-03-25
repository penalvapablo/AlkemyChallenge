import User from './model.js';
import bcrypt from 'bcrypt';

class UsersDao {
  async createUser(email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        email: email,
        password: hashedPassword,
      };

      await User.create(newUser);
    } catch (error) {
      console.log(`error al crear usuario en la db . ${error}`);
    }
  }
  async getUser(email, password) {
    try {
      const user = await User.findOne({ where: { email: `${email}` } });
      if (!user) return { error: 'user not found' };
      const confirmPassword = await bcrypt.compare(password, user.password);
      if (!confirmPassword) {
        return { error: 'incorrect password' };
      }
      return user;
    } catch (error) {
      console.log(`error al buscar usuario en la db . ${error}`);
    }
  }
}

export default new UsersDao();

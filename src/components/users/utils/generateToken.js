import jwt from 'jsonwebtoken';
import config from '../../../config/index.js';

const PRIVATE_KEY = config.JWT_PRIVATE_KEY;

export default async function generateToken(user) {
  try {
    const token = jwt.sign({ data: user }, PRIVATE_KEY, {});
    return token;
  } catch (error) {
    console.log(`error al generar jwt: ${error}`);
  }
}

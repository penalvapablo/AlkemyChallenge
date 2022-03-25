import dotenv from 'dotenv'
dotenv.config()

export default  {
  port: process.env.PORT || '8080',
  cors: process.env.CORS || '*',
  MAIL_ETH_HOST :process.env.MAIL_ETH_HOST,
  MAIL_ETH_PORT :process.env.MAIL_ETH_PORT,
  MAIL_ETH_USER :process.env.MAIL_ETH_USER,
  MAIL_ETH_PASS: process.env.MAIL_ETH_PASS,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY
};
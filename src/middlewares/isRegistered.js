import Users from '../components/users/model.js'

export default async function isRegistered(req, res, next) {
  const { email } = req.body
  const exists = await Users.findAll({where: {email : `${email}`} })
  if (exists.length) {
    res.status(400).json({error: 'email already registered'});
    return;
  }
  next();
};


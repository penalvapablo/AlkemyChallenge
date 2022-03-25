import characters from '../components/characters/routes.js';
import movies from '../components/movies/routes.js'
import auth from '../components/users/routes.js'
import authToken from '../middlewares/authToken.js';

export default (app) => {
  auth(app)

  // Require Token
  app.use(authToken)
  characters(app);
  movies(app)


  app.get('*', (req, res) =>
    res.status(404).json({
      error: -2,
      description: `ruta ${req.originalUrl} método get no implementado`,
    })
  );
};

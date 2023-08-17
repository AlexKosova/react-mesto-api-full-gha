const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const NotFoundError = require('../errors/NotFoundError');
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');

routes.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

routes.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
}), login);

routes.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(?:www\.)?[a-zA-Z0-9а-яА-Я-._~:/?#[\]@!$&'()*+,;=]+/im),
  }),
}), createUser);

routes.use(auth);

routes.use('/users', userRouter);
routes.use('/cards', cardRouter);

routes.use('*', (req, res, next) => {
  next(NotFoundError('Страница не найдена'));
});

module.exports = routes;

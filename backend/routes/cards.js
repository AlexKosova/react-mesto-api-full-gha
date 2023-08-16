const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards, deleteCard, createCard, putLike, deleteLike,
} = require('../controllers/cards');

cardRouter.get('/', getCards);

cardRouter.delete('/:cardId', deleteCard);

cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(/^https?:\/\/(?:www\.)?[a-zA-Z0-9а-яА-Я-._~:/?#[\]@!$&'()*+,;=]+/im),
  }),
}), createCard);

cardRouter.put('/:cardId/likes', putLike);

cardRouter.delete('/:cardId/likes', deleteLike);

module.exports = cardRouter;

const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');

// Валидация входа
const signIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.base': 'Поле должно быть строкой с {#label}.',
      'string.email': 'Некорректный формат {#label}.',
      'any.required': 'Необходимо ввести {#label}.',
      'string.empty': 'Пустое поле, необходимо ввести {#label}.',
    }),
    password: Joi.string().required().min(8).max(30)
      .messages({
        'string.base': 'Некорректный формат поля {#label}. Должна быть строка.',
        'any.required': 'Не введен {#label}, необходимо ввести {#label}.',
        'string.empty': 'Пустое поле, необходимо ввести {#label}.',
      }),
  }),
});

// Валидация регистрации
const signUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new BadRequestError('Неправильный формат URL адреса');
      }
      return value;
    }),
  }),
});

// Валидация Id пользователя
const userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

// Валидация обновления профиля пользователя
const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.base': '{#label} должно быть строкой 2-30 символов.',
        'string.min': '{#label} должно быть строкой 2-30 символов.',
        'string.max': '{#label} должно быть строкой 2-30 символов.',
        'string.empty': 'Пустое поле, необходимо ввести {#label}.',
      }),
    about: Joi.string().required().min(2).max(30)
      .messages({
        'string.base': '{#label} должно быть строкой 2-30 символов.',
        'string.min': '{#label} должно быть строкой 2-30 символов.',
        'string.max': '{#label} должно быть строкой 2-30 символов.',
        'string.empty': 'Пустое поле, необходимо ввести {#label}.',
      }),
  }),
});

// валидация обновления аватара пользователя
const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new BadRequestError('Некорректный URL адреса.');
      }
      return value;
    }),
  }),
});

// Валидация создания карточки
const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new BadRequestError('Некорректный URL адреса.');
      }
      return value;
    }),
  }),
});

// Валидация Id карточки
const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  signUp,
  signIn,
  userIdValidation,
  updateUserValidation,
  updateAvatarValidation,
  createCardValidation,
  cardIdValidation,
};

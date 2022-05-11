const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnathorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value) => {
        const regex = /(https|http):\/\/(www.)?[a-zA-Z0-9-_]+\.[a-zA-Z]+(\/[a-zA-Z0-9-._/~:@!$&'()*+,;=]*$)?/;
        return regex.test(value);
      },
      message: 'Неправильный формат URL адреса.',
    },
  },
});

// Проверка почты и пароля
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    // Пользователь не нашёлся — отклоняем промис
    if (!user) {
      throw new UnathorizedError('Неправильные почта или пароль.');
    }
    // Нашёлся — сравниваем хеши
    return bcrypt.compare(password, user.password).then((matched) => {
      // Хеши не совпали — отклоняем промис
      if (!matched) {
        throw new UnathorizedError('Неправильные почта или пароль.');
      }
      // Аутентификация успешна
      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);

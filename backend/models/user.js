const { Schema, model } = require('mongoose');
const { isEmail, isURL } = require('validator');
const { compare } = require('bcryptjs');
const { VALIDATION_ERROR } = require('../utils/constants').ERROR_MESSAGES;
const AuthorizationError = require('../errors/AuthorizationError');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => isEmail(email),
      message: VALIDATION_ERROR,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (link) => isURL(link),
      message: VALIDATION_ERROR,
    },
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email }, { runValidators: true })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorizationError());
      }

      return compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthorizationError());
        }

        return user;
      });
    });
};

module.exports = model('user', userSchema);

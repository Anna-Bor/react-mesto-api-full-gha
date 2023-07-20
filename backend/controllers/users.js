const { hash } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const {
  JWT_DEFAULT_SECRET, JWT_EXPIRES_IN, JWT_HEADER_NAME, JWT_MAX_AGE, JWT_HTTP_ONLY,
} = require('../environment');
const { ERROR_NAMES } = require('../utils/constants');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

const { JWT_SECRET = JWT_DEFAULT_SECRET } = process.env;

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError());
        return;
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError());
        return;
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  hash(password, 10)
    .then((code) => User.create({
      name,
      about,
      avatar,
      email,
      password: code,
    }))
    .then((user) => {
      res.send({
        name,
        about,
        avatar,
        email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError());
        return;
      }
      switch (err.name) {
        case ERROR_NAMES.VALIDATION_ERROR:
          next(new ValidationError());
          break;
        default:
          next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError());
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      switch (err.name) {
        case ERROR_NAMES.VALIDATION_ERROR:
          next(new ValidationError());
          break;
        default:
          next(err);
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError());
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      switch (err.name) {
        case ERROR_NAMES.VALIDATION_ERROR:
          next(new ValidationError());
          break;
        default:
          next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then(({ _id }) => {
      const token = sign({ _id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
      res.cookie(
        JWT_HEADER_NAME,
        token,
        {
          maxAge: JWT_MAX_AGE,
          httpOnly: JWT_HTTP_ONLY,
        },
      );
      res.send({
        token,
      });
    })
    .catch((err) => {
      switch (err.name) {
        case ERROR_NAMES.VALIDATION_ERROR:
          next(new ValidationError());
          break;
        default:
          next(err);
      }
    });
};

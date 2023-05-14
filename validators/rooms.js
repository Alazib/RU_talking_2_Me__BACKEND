const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

//This is a middleware who cheks the Room before being sent to the controller
const validatorCreateRoom = [
  check("password").exists().notEmpty(),
  check("id_guest").exists().notEmpty(),
  check("participants").exists().notEmpty().isArray(),
  (req, res, next) => validateResults(req, res, next),
]

const validatorGetRoom = [
  check("id").exists().notEmpty().isMongoId(),

  (req, res, next) => validateResults(req, res, next),
]

const validatorUpdateRoom = [
  check("id_room").exists().notEmpty().isMongoId(),
  check("messageLog").exists().isObject(),

  (req, res, next) => validateResults(req, res, next),
]

module.exports = { validatorCreateRoom, validatorGetRoom, validatorUpdateRoom }

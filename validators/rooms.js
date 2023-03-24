const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

//This is a middleware who cheks the Room before being sent to the controller
const validatorCreateRoom = [
  check("id_host").exists().notEmpty(),
  check("password").exists().notEmpty(),

  (req, res, next) => validateResults(req, res, next),
]

const validatorGetRoom = [
  check("id").exists().notEmpty().isMongoId(),

  (req, res, next) => validateResults(req, res, next),
]

module.exports = { validatorCreateRoom, validatorGetRoom }

const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

//This is a middleware who cheks the item before being sent to the controller

const validatorRegister = [
  check("name").exists().notEmpty().isLength({ min: 3, max: 99 }),
  check("age").exists().notEmpty().isNumeric({ min: 18, max: 120 }),
  check("password").exists().notEmpty().isLength({ min: 3, max: 30 }),
  check("email").exists().notEmpty().isEmail({}),

  (req, res, next) => validateResults(req, res, next),
]

const validatorLogin = [
  check("password").exists().notEmpty().isLength({ min: 3, max: 30 }),
  check("email").exists().notEmpty().isEmail({}),

  (req, res, next) => validateResults(req, res, next),
]

module.exports = { validatorRegister, validatorLogin }

const { validationResult } = require("express-validator")

const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw()
    return next() // Check all the validations, if no error: continues to controller
  } catch (err) {
    res.status(403)
    res.send({ errors: err.array() })
  }
}

module.exports = validateResults

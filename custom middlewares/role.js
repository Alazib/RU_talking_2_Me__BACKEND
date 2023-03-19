const { handleHttpError } = require("../utils/handleErrors")

//role param is an array with the allowed roles
const checkRole = (roles) => (req, res, next) => {
  try {
    const { user } = req
    const rolesByUser = user.role

    const checkValueRole = roles.some((roleSingle) =>
      rolesByUser.includes(roleSingle)
    )

    if (!checkValueRole) {
      handleHttpError(res, "USER_NOT_PERMISSION", 403)
      return
    }
    next()
  } catch (e) {
    handleHttpError(res, "ERROR_PERMISSION", 403)
  }
}

module.exports = checkRole

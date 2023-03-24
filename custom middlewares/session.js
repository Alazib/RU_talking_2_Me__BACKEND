const { handleHttpError } = require("../utils/handleErrors")
const { verifyToken } = require("../utils/handleJWT")
const { usersModel } = require("../models/index")

const authMiddleware = async (req, res, next) => {
  //Here we need to catch the token to insert it in the authorization section of the HTTP header
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "NOT_AUTH_KEY_IN_HEADER", 401)
      return
    }
    const token = req.headers.authorization.split(" ").pop()
    const dataToken = await verifyToken(token)

    //This line checks the token payload
    if (!dataToken._id) {
      handleHttpError(res, "ERROR_ID_TOKEN", 401)
      return
    }

    //This line allows us to know who is the user in the controller adding the user prop to the req(
    //take a look in first line of the getRooms controller).
    const user = await usersModel.findById(dataToken._id)
    req.user = user

    next()
  } catch (e) {
    console.log(e)
    handleHttpError(res, "NOT_SESSION", 401)
  }
}

module.exports = authMiddleware

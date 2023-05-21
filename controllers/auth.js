const { matchedData } = require("express-validator")
const { encrypt, compare } = require("../utils/handlePassword")
const { tokenSign } = require("../utils/handleJWT")
const { handleHttpError } = require("../utils/handleErrors")
const { usersModel } = require("../models")

const registerCtrl = async (req, res) => {
  try {
    sanitizedReq = matchedData(req)
    const passwordHash = await encrypt(sanitizedReq.password)
    const dataUser = { ...sanitizedReq, password: passwordHash }
    const newUser = await usersModel.create(dataUser)

    //The purpose of the next line is explained in the users model.
    newUser.set("password", undefined, { strict: false })

    const data = {
      token: await tokenSign(newUser),
      user: newUser,
    }

    res.send(data)
  } catch (e) {
    handleHttpError(res, "ERROR_REGISTER_USER")
  }
}

const loginCtrl = async (req, res) => {
  try {
    sanitizedReq = matchedData(req)
    const user = await usersModel
      .findOne({ email: sanitizedReq.email })
      .select("name age email role password")

    if (!user) {
      handleHttpError(res, "USER_DOESN'T_EXIST", 404)

      return
    }

    const hashPassword = user.password
    //Compare() needs the password not encrypted and the password encrypted to compare both.
    // It returns true or false
    const check = await compare(sanitizedReq.password, hashPassword)

    if (!check) {
      handleHttpError(res, "PASSWORD_INVALID", 401)
      return
    }

    user.set("password", undefined, { strict: false }) //I don't want to show the password in the response

    const data = {
      token: await tokenSign(user),
      user,
    }

    res.send({ data })
  } catch (e) {
    handleHttpError(res, "ERROR_LOGIN_USER")
  }
}

module.exports = { registerCtrl, loginCtrl }

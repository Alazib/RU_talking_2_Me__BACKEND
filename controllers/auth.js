const { matchedData } = require("express-validator")
const { encrypt } = require("../utils/handlePassword")
const { tokenSign } = require("../utils/handleJWT")
const { usersModel } = require("../models")

const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req)
    const passwordHash = await encrypt(req.password)
    const body = { ...req, password: passwordHash }
    const dataUser = await usersModel.create(body)
    //The purpose of the next line is explained in the users model.
    dataUser.set("password", undefined, { strict: false })

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    }

    res.send(data)
  } catch (e) {}
}

module.exports = { loginCtrl }

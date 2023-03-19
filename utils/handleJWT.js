const JWT = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

//First: create (sign) the JWT
const tokenSign = async (user) => {
  const sign = JWT.sign(
    //This is the JWT payload:
    {
      _id: user._id,
      role: user.role,
    },
    // This is the secret:
    JWT_SECRET,
    //This is the expiration time:
    {
      expiresIn: "2h",
    }
  )
  return sign
}

// Second: verifies if JWT was correctly given by the backend
const verifyToken = async (tokenJWT) => {
  try {
    return JWT.verify(tokenJWT, JWT_SECRET)
  } catch (e) {
    return null
  }
}

module.exports = { tokenSign, verifyToken }

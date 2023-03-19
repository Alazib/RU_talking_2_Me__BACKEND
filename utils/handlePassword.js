const bcriptjs = require("bcryptjs")

//This function takes the password without encryptation (passwordPlain) and encrypts it
const encrypt = async (passwordPlain) => {
  const hash = await bcriptjs.hash(passwordPlain, 10)
  return hash
}

//This function takes the hash and the password plain and compares it
const compare = async (passwordPlain, hash) => {
  return await bcriptjs.compare(passwordPlain, hash)
}

module.exports = { encrypt, compare }

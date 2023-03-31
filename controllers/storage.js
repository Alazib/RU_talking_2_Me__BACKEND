const fs = require("fs")
const { storageModel } = require("../models")
const { matchedData } = require("express-validator")
const { handleHttpError } = require("../utils/handleErrors")

const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = `${__dirname}/../storage`

const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({})
    res.send({ data })
  } catch (e) {
    handleHttpError(res, "ERROR_GET_Items")
  }
}

const getItem = async (req, res) => {
  try {
    req = matchedData(req)
    const { id } = req
    const data = await storageModel.findById(id)
    res.send({ data })
  } catch (e) {
    handleHttpError(res, "ERROR_GET_Item")
  }
}

const createItem = async (req, res) => {
  const { file } = req
  try {
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    }

    const data = await storageModel.create(fileData)
    res.send(data)

    console.log(
      "[[3]] soy el controlador POST de storage.js: 1) He sido llamado por /routes/storage.js 2) Ya he consumido el modelo con POST 3) Ya he guardado con MULTER STORAGE el archivo"
    )
  } catch (e) {
    handleHttpError(res, "ERROR_POST_Item")
  }
}

const deleteItem = async (req, res) => {
  try {
    req = matchedData(req)
    const { id } = req
    const data = await storageModel.findById(id)
    await storageModel.delete({ _id: id })

    const { filename } = data
    const filePath = `${MEDIA_PATH}/${filename}`
    fs.unlinkSync(filePath)
    const finalResult = {
      filePath,
      deleted: 1,
    }

    res.send({ finalResult })
  } catch (e) {
    handleHttpError(res, "ERROR_DELETE_Item")
  }
}

module.exports = {
  getItems,
  getItem,
  createItem,
  deleteItem,
}

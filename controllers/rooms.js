const { matchedData } = require("express-validator")
const { roomsModel } = require("../models")
const { handleHttpError } = require("../utils/handleErrors")

const getRooms = async (req, res) => {
  try {
    const user = req.user
    const data = await roomsModel.findAllData()
    res.send({ data, user })
  } catch (e) {
    handleHttpError(res, "ERROR_GET_Rooms")
  }
}

const getRoom = async (req, res) => {
  try {
    req = matchedData(req)
    const { id } = req
    const data = await roomsModel.findOneData(id)
    res.send({ data })
  } catch (e) {
    handleHttpError(res, "ERROR_GET_Room")
  }
}

const createRoom = async (req, res) => {
  try {
    const body = matchedData(req)
    const data = await roomsModel.create(body)
    res.send({ data })
  } catch (e) {
    handleHttpError(res, "ERROR_CREATE_Room")
  }
}

const updateRoom = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req)
    const data = await roomsModel.findOneAndUpdate(id, body)
    res.send({ data })
  } catch (e) {
    handleHttpError(res, "ERROR_UPDATING_Rooms")
  }
}

const deleteRoom = async (req, res) => {
  try {
    req = matchedData(req)
    const { id } = req

    const data = await roomsModel.delete({ _id: id })
    res.send({ data })
  } catch (e) {
    handleHttpError(res, "ERROR_DELETE_Room")
  }
}

module.exports = {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
}

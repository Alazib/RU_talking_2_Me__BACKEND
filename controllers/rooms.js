const { matchedData } = require("express-validator")
const { roomsModel } = require("../models")
const { handleHttpError } = require("../utils/handleErrors")

const getRooms = async (req, res) => {
  try {
    const user = req.user
    const data = await roomsModel.find()
    res.send({ data, user })
  } catch (e) {
    handleHttpError(res, "ERROR_GET_Rooms")
  }
}

const getRoom = async (req, res) => {
  try {
    req = matchedData(req)

    const { id } = req
    const data = await roomsModel.findById(id)
    res.send({ data })
  } catch (e) {
    handleHttpError(res, "ERROR_GET_Room")
  }
}

const createRoom = async (req, res) => {
  try {
    const id_user = req.user.id
    let sanitizedReq = matchedData(req)
    sanitizedReq = { ...sanitizedReq, id_host: id_user }

    const findRoomIfExists = await roomsModel.findOne({
      $or: [
        {
          participants: [sanitizedReq.id_guest, sanitizedReq.id_host],
        },
        {
          participants: [sanitizedReq.id_host, sanitizedReq.id_guest],
        },
      ],
    })

    if (findRoomIfExists) {
      res.send({
        data: findRoomIfExists,
        chatAlreadyExists: true,
      })

      return
    }

    const data = await roomsModel.create(sanitizedReq)

    res.send({ data })
  } catch (e) {
    handleHttpError(res, "ERROR_CREATE_Room")
    console.log(e)
  }
}

const updateRoom = async (req, res) => {
  try {
    const { messageLog } = matchedData(req)
    console.log(messageLog)
    const roomToUpdate = await roomsModel.findOneAndUpdate(
      {
        $or: [
          {
            participants: [messageLog.from, messageLog.to],
          },
          {
            participants: [messageLog.to, messageLog.from],
          },
        ],
      },
      { $push: { chatLog: messageLog } },
      { new: true }
    )
    res.send({ roomToUpdate })
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

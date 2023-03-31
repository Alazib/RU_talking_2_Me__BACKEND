const express = require("express")
const {
  getRooms,
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/rooms")
const { validatorCreateRoom, validatorGetRoom } = require("../validators/rooms")
const authMiddleware = require("../custom middlewares/session")
const checkRole = require("../custom middlewares/role")

const router = express.Router()

router.get("/", authMiddleware, getRooms)

router.get("/:id", authMiddleware, validatorGetRoom, getRoom)

router.post(
  "/",
  authMiddleware,
  checkRole(["user"]),
  validatorCreateRoom,
  createRoom
)

router.put(
  "/:id",
  authMiddleware,
  validatorGetRoom,
  validatorCreateRoom,
  updateRoom
)

router.delete("/:id", authMiddleware, validatorGetRoom, deleteRoom)

module.exports = router

const express = require("express")
const {
  getItems,
  createItem,
  getItem,
  updateItem,
  deleteItem,
} = require("../controllers/tracks")
const {
  validatorCreateItem,
  validatorGetItem,
} = require("../validators/tracks")
const authMiddleware = require("../custom middlewares/session")
const checkRole = require("../custom middlewares/role")

const router = express.Router()

router.get("/", authMiddleware, getItems)

router.get("/:id", authMiddleware, validatorGetItem, getItem)

router.post(
  "/",
  authMiddleware,
  checkRole(["admin"]),
  validatorCreateItem,
  createItem
)

router.put(
  "/:id",
  authMiddleware,
  validatorGetItem,
  validatorCreateItem,
  updateItem
)

router.delete("/:id", authMiddleware, validatorGetItem, deleteItem)

module.exports = router

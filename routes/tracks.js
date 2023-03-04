const express = require("express")
const { getItems, createItem } = require("../controllers/tracks")
const customHeader = require("../middleware/customHeader")
const validatorCreateItem = require("../validators/tracks")
const router = express.Router()

router.get("/", getItems)

router.post("/", validatorCreateItem, customHeader, createItem)

module.exports = router

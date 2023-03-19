require("dotenv").config()
const express = require("express")
const cors = require("cors")
const dbConnect = require("./config/mongo")
const morganBody = require("morgan-body")
const loggerStream = require("./utils/handleLogger")

const app = express()

app.use(cors())

app.use(express.json())

//Morgan Body are looking what's happening in request-response and generates a log.
// After that I take the log (with its prop "stream.write" --> on handleLogger) and I send
// it to Slack (with de slakc/webhook on handleLogger)

morganBody(app, {
  noColors: true,
  stream: loggerStream,
  // skip: function (req, res) {
  //   return res.statusCode < 400
  //   //This function omits all messages that are not errors
  // },
})

app.use("/api", require("./routes"))

app.use(express.static("./storage"))

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log("Tu app está lista por http://localhost:" + port)
})

dbConnect()

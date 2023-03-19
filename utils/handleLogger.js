const { IncomingWebhook } = require("@slack/webhook")

const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK)

const loggerStream = {
  write: (message) => {
    webHook.send({
      text: message,
      //At this point I cant connect morganBody to Telegram, Email, etc. Only
      // changing the webHook
    })
  },
}

module.exports = loggerStream

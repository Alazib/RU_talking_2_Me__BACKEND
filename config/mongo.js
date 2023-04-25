const mongoose = require("mongoose")

const dbConnect = () => {
  const DB_URI = process.env.DB_URI
  //this mongoos.set is to avoid this warnin: (node:22160) [MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
  mongoose.set("strictQuery", false)

  mongoose
    .connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MONGOOSE INFORMA: **CONEXIÓN CORRECTA***")
    })
    .catch((err) => {
      if (err) {
        console.log("MONGOOSE INFORMA: ***ERROR DE CONEXIÓN***")
      }
    })
}

module.exports = dbConnect

const mongoose = require("mongoose")
const mongooseSoftDelete = require("mongoose-delete")

const UserScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      //When setting "select" at "false" the http response doesn't shows de password. Very important:
      // The .create method (usersModel.create) used on the controller doesn't allow to filter (only
      //methods like .find, findById, etc ), so it returns the whole data as exists in the model. This is why
      // we need to use --> data.set("password", undefined, { strict: false })  in the controller.
      select: false,
    },
    role: {
      type: ["user", "admin"],
      default: "user",
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
)

//Implement mongoose-delete plugin & overrides native methods of Mongoose:
UserScheme.plugin(mongooseSoftDelete, { overrideMethods: "all" })
module.exports = mongoose.model("users", UserScheme)

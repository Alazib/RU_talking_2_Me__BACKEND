const mongoose = require("mongoose")
const mongooseSoftDelete = require("mongoose-delete")

const RoomsScheme = new mongoose.Schema(
  {
    id_host: {
      type: String,
    },
    password: {
      type: String,
    },
    id_guest: {
      type: String,
    },
    chatLog: {
      type: Array,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
)

//Implement an ad-hoc method to collect all the rooms in Rooms BUT ALSO related with the users
RoomsScheme.statics.findAllData = function () {
  const joinData = this.aggregate([
    {
      $lookup: {
        from: "users", //I want this collection to join
        localField: "id_host", // rooms.id_host
        foreignField: "_id", //   users._id
        as: "room_user", //alias
      },
    },
    { $unwind: "$room_user" }, // unwind give me only the object (instead of the array of objects)
  ])
  return joinData

  //$lookup, $unwind... are different stages to pass through
}
//Implement an ad-hoc method to collect ONE Room in rooms BUT ALSO related with the storage
RoomsScheme.statics.findOneData = function (id) {
  const joinData = this.aggregate([
    {
      $lookup: {
        from: "storages", //I want this collection to join
        localField: "mediaId", // rooms.mediaId
        foreignField: "_id", //   storages._id
        as: "audio", //alias
      },
    },
    { $unwind: "$audio" }, // unwind give me only the object (instead of the array of objects)
    {
      $match: {
        _id: mongoose.Types.ObjectId(id),
      },
    },
  ])
  return joinData

  //$lookup, $unwind... are different stages to pass through
}

// //Implement mongoose-delete plugin & overrides native methods of Mongoose:
RoomsScheme.plugin(mongooseSoftDelete, { overrideMethods: "all" })

module.exports = mongoose.model("rooms", RoomsScheme)

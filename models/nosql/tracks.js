const mongoose = require("mongoose")
const mongooseSoftDelete = require("mongoose-delete")

const TracksScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    album: {
      type: String,
    },
    cover: {
      type: String,
      validate: {
        validator: (req) => {
          return true
        },
        message: "ERROR_URL",
      },
    },

    artist: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      },
    },
    duration: {
      start: { type: Number },
      end: { type: Number },
    },
    mediaId: {
      type: mongoose.Types.ObjectId,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
)

//Implement an ad-hoc method to collect all the items in tracks BUT ALSO related with the storage
TracksScheme.statics.findAllData = function () {
  const joinData = this.aggregate([
    {
      $lookup: {
        from: "storages", //I want this collection to join
        localField: "mediaId", // tracks.mediaId
        foreignField: "_id", //   storages._id
        as: "audio", //alias
      },
    },
    { $unwind: "$audio" },
  ])
  return joinData

  //$lookup, $unwind... are different stages to pass through
}
//Implement an ad-hoc method to collect ONE items in tracks BUT ALSO related with the storage
TracksScheme.statics.findOneData = function (id) {
  const joinData = this.aggregate([
    {
      $lookup: {
        from: "storages", //I want this collection to join
        localField: "mediaId", // tracks.mediaId
        foreignField: "_id", //   storages._id
        as: "audio", //alias
      },
    },
    { $unwind: "$audio" },
    {
      $match: {
        _id: mongoose.Types.ObjectId(id),
      },
    },
  ])
  return joinData

  //$lookup, $unwind... are different stages to pass through
}

//Implement mongoose-delete plugin & overrides native methods of Mongoose:
TracksScheme.plugin(mongooseSoftDelete, { overrideMethods: "all" })

module.exports = mongoose.model("tracks", TracksScheme)

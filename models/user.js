const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    sessionID: {
      type: String,
      required: false
    }
  }
)

module.exports = mongoose.model('User', userSchema)
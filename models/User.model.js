const { Schema, model } = require("mongoose");
const Experience = require('./Experiences.model')

// TODO: Please make sure you edit the user model to whatever makes sense in this case

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },

    firstName: {
      type: String
    },

    lastName: {
      type: String
    },
    
    email: {
    type: String,
    required: true,
    unique: true
  },

    password: {
    type: String,
    required: true
  },

  friends:{
    type: []
  },

experiences: [{ type: Schema.Types.ObjectId, ref: Experience }]
}

);

const User = model("User", userSchema);

module.exports = User;



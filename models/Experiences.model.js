const { Schema, model } = require("mongoose");
const Comment = require('./Comments.model')
// TODO: Please make sure you edit the user model to whatever makes sense in this case
const experiencesSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    picture: {
      type: String
    },
    owner: {
       type: Schema.Types.ObjectId, ref: 'User'
    },
    comments : [{ type: Schema.Types.ObjectId, ref: Comment }] // new
  },
    {
      timestamps: true,
    }
);


const Experience = model("Experience", experiencesSchema);

module.exports = Experience;



 
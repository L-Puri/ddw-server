const { Schema, model } = require("mongoose");

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
    }
  },
    {
      timestamps: true,
    }
);


const Experience = model("Experience", experiencesSchema);

module.exports = Experience;



 
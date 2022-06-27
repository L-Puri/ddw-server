// Experiences Routes
const router = require("express").Router();
const Experience = require("../models/Experiences.model");

/* Create Entry Route (post) */
router.post("/create-entry", async (req, res, next) => {
  const { title, description, picture, owner } = req.body;
  console.log('SEE HERE NEW ENTRY ---->', req.body)
  try {
    const newExperience = await Experience.create({
      title: title.trim(),
      description: description.trim(),
      picture: picture.trim(),
      author: owner.trim()
    });
    User.updateOne({_id:owner}, {$push: {experiences: [newExperience]}})

    res
      .status(201)
      .json({ message: "New experience created", id: newExperience.id });
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.post("/create-entry", (req, res) => {
//     console.log ("serverside-recieving (experience-creation): ", req.body) 
//   const { title, description, picture } = req.body;
//   if (title === '' || description === '' || picture === '') {
//     res.status(400).json({ message: "Provide title, description and picture!" });
//     return;
// }

// Experience.findOne({ title })
//     .then((foundTitle) => {
//       console.log('Were inside!')
//       if (foundTitle) {
//         res.status(400).json({ message: "Title already exists. Find a cooler dream" });
//         return;
//       }
 
     
//     })
//     .then((createdExperience) => {
//         const { title, description, _id } = createdExperience;
//         const experience = { title, description, _id };
//         res.status(201).json({ experience: experience });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ message: "Internal Server Error" })
//     });
// });










/* Update Entry Route (put) */
router.put("/update-entry/:experienceId", async (req, res, next) => {
  const { experienceId } = req.params;
  const { title, description, picture } = req.body;

  const newData = {};

  if (title !== "") {
    newData.title = title.trim();
  }

  if (description !== "") {
    newData.description = description.trim();
  }

  if (picture !== "") {
    newData.picture = picture.trim();
  }

  try {
    const experience = await Experience.findByIdAndUpdate(
      experienceId,
      newData
    );
    res.status(200).json({ message: "Experience updated", id: experience.id });
  } catch (error) {
    res.status(500).json(error);
  }
});

// /* Get All Entries Route */
// router.get("/", async (req, res, next) => {
//   const experiences = await Experience.find();
//   res.json(experiences);
// });

// /* Get One Specific Entriy Route */
// router.get("/:experienceId", async (req, res, next) => {
//   const { experienceId } = req.params;

//   const experiences = await Experience.findById(experienceId);
//   res.json(experiences);
// });

/* Delete Entry Route (delete) */
router.delete("/delete-entry/:experienceId", async (req, res, next) => {
  const { experienceId } = req.params;

  await Experience.findByIdAndDelete(experienceId);
  res.status(200).json({ message: "Experience deleted" });
});

module.exports = router;

//For the overarching workshop routes

const router = require("express").Router();
let Workshop = require("../models/workshop.model");

//To Handle GET Requests
router.route("/").get((req, res) => {
  Workshop.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Handles POST Requests
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const tags = req.body.tags; //If Something is completed
  const hazardData = req.body.hazardData;

  const newWorkshop = new Workshop({
    name,
    tags,
    hazardData,
  });

  newWorkshop
    .save()
    .then(() => res.json("Message added"))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/:id").delete((req, res) => {
  Workshop.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

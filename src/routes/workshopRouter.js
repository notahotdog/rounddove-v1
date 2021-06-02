//For the overarching workshop routes

const router = require("express").Router();
let Workshop = require("../models/workshop.model");
// let WorkshopTest = require("../models/workshop.model.test");
// let WorkshopComplete = require("../models/workshopComplete.model");

//To Handle GET Requests
router.route("/").get((req, res) => {
  Workshop.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Node

//POST Request - Add Workshop
router.route("/addWorkshop").post((req, res) => {
  const workshopName = req.body.workshopName;
  const tags = req.body.tags;
  const nodes = req.body.nodes;

  const newWorkshop = new Workshop({
    workshopName,
    tags,
    nodes,
  });

  console.log("Router Saving Workshop");

  newWorkshop
    .save()
    .then(() => res.json("Workshop Added"))
    .catch((err) => res.status(400).json("Error" + err));
});

// //Handle POST Requests
// router.route("/add").post((req, res) => {
//   const workshopName = req.body.workshopName;
//   const tags = req.body.tags; //If Something is completed
//   const components = req.body.components;

//   const newWorkshop = new WorkshopTest({
//     workshopName,
//     tags,
//     components,
//   });

//   //ROUTER REQUEST
//   console.log("REQUESTING ROUTER");

//   newWorkshop
//     .save()
//     .then(() => res.json("Message added"))
//     .catch((err) => res.status(400).json("Error" + err));
// });

// //Post Request for upload components
// router.route("/addCompleteWorkshop").post((req, res) => {
//   const workshopName = req.body.workshopName;
//   const tags = req.body.tags; //If Something is completed
//   const components = req.body.components;

//   //change Model
//   const newWorkshopComplete = new WorkshopComplete({
//     workshopName,
//     tags,
//     components,
//   });

//   //ROUTER REQUEST
//   console.log("REQUESTING ROUTER");

//   newWorkshopComplete
//     .save()
//     .then(() => res.json("Message added"))
//     .catch((err) => res.status(400).json("Error" + err));
// });

router.route("/:id").delete((req, res) => {
  Workshop.findByIdAndDelete(req.params.id)
    .then(() => res.json("Workshop deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

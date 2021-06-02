//Not used
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//For Node Format
const nodeSchema = new Schema({
  nodeName: {
    type: String,
  },
  subnodes: {
    type: [String], //To Be Modified at a later date
  },
});

const workshopSchema = new Schema({
  workshopName: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: ["pending"],
  },
  nodes: {
    type: [nodeSchema],
  },
});

//For Component Format
// const componentSchema = new Schema({
//   componentName: {
//     type: String,
//   },
//   subcomponents: {
//     type: [String],
//   },
// });

// const workshopSchema = new Schema({
//   workshopName: {
//     type: String,
//     required: true,
//   },
//   tags: {
//     type: [String],
//     default: ["pending"],
//   },
//   components: {
//     type: [componentSchema],
//   },
// });

const workshop = mongoose.model("workshop", workshopSchema, "workshop");
module.exports = workshop;

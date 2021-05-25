const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const NodeSchema = new Schema({ name: String }); //subcomponents should be present inside here
// const hazardDataSchema = new Schema({ name: { type: String } }); //subcomponents should be present inside here

var hazardDataSchema = new Schema({
  name: { type: String },
});

const workshopSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: ["pending"],
  },
  hazardData: {
    // type: [String],
    type: [String],
    // type: [hazardDataSchema],
  },
  //node: [NodeSchema], //component
});

const workshop = mongoose.model("workshop", workshopSchema);
module.exports = workshop;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hazardSchema = new Schema({
  hazardName: {
    type: String,
  },
  causes: {
    type: [String],
  },
  consequences: {
    type: [String],
  },
  preventativeSafeguards: {
    type: [String],
  },
  mitigatingSafeguards: {
    type: [String],
  },
});

const subnodeSchema = new Schema({
  subnodeName: {
    type: String,
  },
  hazards: {
    type: [hazardSchema],
  },
});

const nodeSchema = new Schema({
  nodeName: {
    type: String,
  },
  subnodes: {
    type: [subnodeSchema],
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

const workshop = mongoose.model("workshop", workshopSchema, "workshop"); //The first param specifies the collection name
module.exports = workshop;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const componentSchema = new Schema({
  componentName: {
    type: String,
  },
  subcomponents: {
    type: [String],
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
  components: {
    type: [componentSchema],
  },
});

const workshop = mongoose.model("workshop", workshopSchema, "workshop");
module.exports = workshop;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

theaterSchema = new Schema(
  {
    theaterId: Number,
    location: {
      geo: {
        type: String,
        coordinates: [Number],
      },
      address: {
        street1: String,
        city: String,
        state: String,
        zipcode: String,
      },
    },
  },
  { typeKey: "$type" }
);

module.exports = Theater = mongoose.model("theaters", theaterSchema);

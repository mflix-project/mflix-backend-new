const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  _id: String,
  plot: String,
  genres: [String],
  runtime: Number,
  cast: [String],
  num_mflix_comments: Number,
  title: String,
  fullplot: String,
  languages: [String],
  released: Date,
  directors: [String],
  writers: [String],
  rated: String,
  poster: String,
  awards: {
    wins: Number,
    nominations: Number,
    text: String,
  },
  lastUpdated: Date,
  year: Number,
  imdb: {
    rating: Number,
    votes: Number,
    id: Number,
  },
  countries: [String],
  type: String,
  tomatoes: {
    viewer: {
      rating: Number,
      numReviews: Number,
      meter: Number,
    },
    dvd: Date,
    critic: {
      rating: Number,
      numReviews: Number,
      meter: Number,
    },
    fresh: Number,
    rotten: Number,
    lastUpdated: Date,
    consensus: String,
    production: String,
  },
});

module.exports = mongoose.model("movies", movieSchema, "Movie");

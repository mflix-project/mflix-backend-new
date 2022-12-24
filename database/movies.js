const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  movieId: Number,
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
    critic: {
      rating: Number,
      numReviews: Number,
      meter: Number,
    },
    fresh: Number,
    rotten: Number,
    lastUpdated: Date,
  },
});

module.exports = Movie = mongoose.model("movies", movieSchema);

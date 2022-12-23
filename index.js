const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { query } = require("express-validator");
require("dotenv").config();

const db = require("./database/models");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let api = express.Router();
app.use("/api", api);

mongoose.connection
  .on("error", (err) => {
    console.log("MongoDB connection error", err);
  })
  .once("open", () => {
    console.log("Successfully connected to MongoDB!");
  });

api.get("/", (req, res) => {
  return res.json({ message: "API listening" });
});

api.get("/movies", async (req, res) => {
  console.log("Return movies");
  try {
    if (req.query.title) {
      const result = await db.Movie.find({ title: req.query.title });
      return res.status(200).json(result);
    } else {
      const page = req.query.page;
      const perPage = req.query.perPage;

      const movies = await db.Movie.find({
        poster: { $exists: true },
      })
        .skip((page - 1) * perPage)
        .limit(+perPage)
        .exec();

      return res.status(200).json(movies);
    }
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Unable to fetch movies data - ${err}` });
  }
});

api.get("/movies/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const movie = await db.Movie.findOne({ _id: id }).exec();
    return res.status(200).json(movie);
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Unable to fetch requested movie data", err });
  }
});

api.get("/theaters", async (req, res) => {
  try {
    const page = req.query.page;
    const perPage = req.query.perPage;
    const city = req.query.city;

    if (req.query.city) {
      const theaters = await db.Theater.find({
        "location.address.city": city,
      })
        .skip((page - 1) * perPage)
        .limit(+perPage)
        .exec();

      return res.status(200).json(theaters);
    } else {
      const theaters = await db.Theater.find()
        .skip((page - 1) * perPage)
        .limit(+perPage)
        .exec();
      return res.status(200).json(theaters);
    }
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Unable to fetch theatre data", err });
  }
});

api.get("/theaters/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const theater = await db.Theater.findOne({ _id: id }).exec();
    return res.status(200).json(theater);
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Unable to fetch requested theatre data", err });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});

import "dotenv/config";
import express from "express";
import axios from "axios";
import cors from "cors";
import User from "./models/user.model.js";
import connectDB from "./util/connectDB.js";
import bcrypt from "bcryptjs";

const PORT = process.env.port || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/api/user/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await User.findById(uid);
    res.json({ username: user.username, id: user._id });
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/api/user/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (username.trim() === "" || password.trim() === "")
      return res.json({ error: "Invalid username or password!" });
    const user = await User.findOne({ username });
    if (!user) return res.json({ error: "Wrong username!" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.json({ error: "Wrong password!" });
    res.json({ id: user._id, username: user.username });
  } catch (error) {
    console.log("Error in Login handler: " + error);
  }
});

app.post("/api/user/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (username.trim() === "" || password.trim() === "")
      return res.json({ error: "Invalid username or password!" });
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.json({ error: "Username already exists!" });
    const user = await User.create({ username, password });
    res.json({ id: user._id, username: user.username });
  } catch (error) {
    console.log("Error in Signup handler: " + error.message);
  }
});

//Get both TV and Movies
app.get("/api/", async (req, res) => {
  const data = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${process.env.TMDB_API_KEY}`
  );
  res.json({ all: data.data.results });
});

//Get Popular movie
app.get("/api/movie/", async (req, res) => {
  const data = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${process.env.TMDB_API_KEY}`
  );
  res.json({ topMovie: data.data.results[0] });
});

//TV shows endpoints
app.get("/api/tv/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;
  const data = await axios.get(
    `https://api.themoviedb.org/3/search/tv?query=${searchQuery}&include_adult=false&language=en-US&page=1&api_key=${process.env.TMDB_API_KEY}`
  );
  res.json({ tv: data.data.results });
});

app.get("/api/tv", async (req, res) => {
  const data = await axios.get(
    `https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=${process.env.TMDB_API_KEY}`
  );
  res.json({ tv: data.data.results });
});

app.get("/api/tv/details/:tvid", async (req, res) => {
  const { tvid } = req.params;
  const data = await axios.get(
    `https://api.themoviedb.org/3/tv/${tvid}&api_key=${process.env.TMDB_API_KEY}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      },
    }
  );
  res.json({ tv: data.data });
});

//Movies endpoints
app.get("/api/movies/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;
  const data = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1&api_key=${process.env.TMDB_API_KEY}`
  );
  res.json({ movies: data.data.results });
});

app.get("/api/movies", async (req, res) => {
  const data = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${process.env.TMDB_API_KEY}`
  );
  res.json({ movies: data.data.results });
});

app.get("/api/movie/:mid", async (req, res) => {
  const { mid } = req.params;
  const data = await axios.get(`https://api.themoviedb.org/3/movie/${mid}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
  });

  res.json({ movie: data.data });
});

app.listen(PORT, () => {
  connectDB();
  console.log("listening on http://localhost:" + PORT);
});

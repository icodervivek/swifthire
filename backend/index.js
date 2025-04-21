import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";
import cors from "cors"
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/userDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", async (req, res) => {
  let { fullName, email, city, dateOfBirth } = await User.findById(
    "6805d6de1f579eb6e55445e8"
  );
  let dob = new Date(dateOfBirth);
  let year = dob.getFullYear();
  let currentYear = new Date().getFullYear();
  res.json({
    fullName: fullName,
    email: email,
    city: city,
    age: currentYear - year,
  });
});

app.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

app.listen(3000, () => {
  console.log(`Server is up and running on PORT 3000`);
});

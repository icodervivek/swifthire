import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    username: "vivs",
    password: "Qwerty@123",
  });
});

app.listen(3000, () => {
  console.log(`Server is up and running on PORT 3000`);
});

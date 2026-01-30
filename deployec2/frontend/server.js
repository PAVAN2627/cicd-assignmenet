const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("templates"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "form.html"));
});

app.post("/submit", async (req, res) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/process`,
      req.body
    );

    res.send(`
      <h2>Response from Flask Backend</h2>
      <p><b>Name:</b> ${response.data.name}</p>
      <p><b>Email:</b> ${response.data.email}</p>
      <p>${response.data.message}</p>
    `);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error connecting to Flask backend");
  }
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Frontend running on port 3000");
  console.log("Backend URL:", BACKEND_URL);
});

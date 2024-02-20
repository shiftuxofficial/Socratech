const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5500;

const ROOT_DIR = path.resolve();

// MongoDB connection
mongoose.connect('mongodb+srv://manjeet0796:manjeet0796@cluster0.irnuxnb.mongodb.net/Socratech?retryWrites=true&w=majority')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Signup schema
const signupSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Signup model
const Signup = mongoose.model('Socratech.signup', signupSchema);

app.use(bodyParser.json());

app.get("/", (req, res) => {
  const filepath = `${ROOT_DIR}/src/landing.html`;
  res.sendFile(filepath);
});

app.get("/signup", (req, res) => {
  const filepath = `${ROOT_DIR}/src/signup.html`;
  res.sendFile(filepath);
});

app.post("/signup", async (req, res) => {
  const { email, username, password, confpassword } = req.body;

  try {
    // Check if password and confirm password match
    if (password !== confpassword) {
      return res.status(400).send("Passwords do not match");
    }

    // Check if email already exists
    const existingEmail = await Signup.findOne({ email });
    if (existingEmail) {
      return res.status(400).send("Email already exists");
    }

    // Check if username already exists
    const existingUsername = await Signup.findOne({ username });
    if (existingUsername) {
      return res.status(400).send("Username already exists");
    }

    // Create a new Signup document
    const newSignup = new Signup({ email, username, password });

    // Save the new signup to the database
    const savedData = await newSignup.save();
    console.log('Data saved to the database:', savedData);
    res.redirect('/login');

  } catch (error) {
    console.error('Error saving data:', error.message);
    res.status(500).send('Error saving data');
  }
});

app.get("/login", (req, res) => {
  const filepath = `${ROOT_DIR}/src/login.html`;
  res.sendFile(filepath);
});

app.get("/explore", (req, res) => {
  const filepath = `${ROOT_DIR}/src/explore.html`;
  res.sendFile(filepath);
});

// for handling CSS files
app.use(express.static("src"));

const displayAll = async () => {
  try {
    const allData = await Signup.find();
    console.log(allData);
    return allData;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

displayAll(); // This will execute when the script runs

app.listen(port, () => console.log("Listening On", port));

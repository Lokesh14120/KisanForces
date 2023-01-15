const express = require("express");
const dotenv = require('dotenv');
const passport = require("passport");
const mongoose = require("mongoose");
dotenv.config();
const MongoStore = require("connect-mongo");
const cors = require("cors");
const app = express();
const session = require("express-session");
const GoogleStrategy=require('passport-google-oauth20');
const bodyParser = require("body-parser");

require("./config/passport")(passport);

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(
  session({
    secret: "some random secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

app.use(passport.initialize());

app.use(passport.session());

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("DB Connected")
);


app.use('/api/codetest', require('./routes/codetest'))

app.use('/api/problem', require('./routes/problem'))
app.use('/api/auth', require('./routes/auth'))

app.get('/google',passport.authenticate('google',{
      scope:['profile']
}))
app.get(
  "/auth/google/callback",   
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/");
  }
);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server is listening"));
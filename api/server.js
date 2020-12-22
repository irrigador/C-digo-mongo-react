require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;
const passport = require("passport");

//middwares
app.use(cors());
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(passport.initialize());
app.use(passport.session());


/*/ Coloquei o link na pasta env. Nunca utilizei um arqueivo dessa forma 
Sempre utilizo o comando 
mongoose.connect ('URI') {}
/*/
//URI do banco
const uri = process.env.ATLAS_URI; 
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Response Situation Database MongoDB
mongoose.connection
  .once("open", function () {
    console.log("MongoDB database connection established successfully");
  })
  .on("error", function (error) {
    console.log("Mongo Error is: ", error);
  });

const usuariosRouter = require("./routes/usuarios");
app.use("/usuarios", usuariosRouter);

//Server Listen Port
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
module.exports = app;

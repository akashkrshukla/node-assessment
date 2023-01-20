const mongoose = require("mongoose");
const {DATABASE_CONN_URL} = require("./constants");

mongoose.connect(
    DATABASE_CONN_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error, result) => {
    if (error) console.log(error);
    else console.log("Database Connected");
  }
);

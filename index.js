const express = require("express");
const app = express();
const cors = require ('cors')
require("./mongodb");

app.use(express.json());
app.use(cors());

app.use('/static', express.static('public'))

app.use("/user", require("./routes/userRoutes"));

app.listen(3001, () => console.log("App listens on port 3001"));

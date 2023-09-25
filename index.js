const { application } = require("express");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { UserRouter } = require("./Routes/UserRoutes");
const { EmployeeModel } = require("./Models/DashboardModel");
const { EmployeeRouter } = require("./Routes/DashboardRoute");

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", UserRouter);
app.use("/employees", EmployeeRouter )

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, async () => {
  try {
    await connection;
    console.log("server is running");
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }
});

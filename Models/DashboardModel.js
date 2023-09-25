const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    department: String,
    date: String,
    salary: Number,
  },
  {
    versionKey: false,
  }
);

const EmployeeModel = mongoose.model("employee", EmployeeSchema);

module.exports = {
  EmployeeModel,
};

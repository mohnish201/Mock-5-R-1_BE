const express = require("express");
const { auth } = require("../MiddleWare/auth");
const { EmployeeModel } = require("../Models/DashboardModel");

const EmployeeRouter = express.Router();

EmployeeRouter.use(auth);

EmployeeRouter.post("/add", async (req, res) => {
  try {
    const NewEmployee = new EmployeeModel(req.body);
    await NewEmployee.save();
    res.send("New Employee has been added");
  } catch (error) {
    res.send(error);
  }
});

EmployeeRouter.get("/", async (req, res) => {
  const { q, department, page, limit, sort, order } = req.query;
  let query = {};

  if (q) {
    query.firstname = { $regex: q, $options: "i" };
  }

  //   if (department) {
  //     query.department = { department: department };
  //   }

  //   if (sort && order) {
  //     if (order == "asc") {
  //       query.sort = { $sort: { sort: 1 } };
  //     } else {
  //       query.sort = { $sort: { sort: -1 } };
  //     }
  //   }
  const toSkip = (page - 1) * limit;

  try {
    const employees = await EmployeeModel.find(query).skip(toSkip).limit(limit);
    if (employees) {
      res.send(employees);
    } else {
      res.send("No Employee data");
    }
  } catch (error) {
    res.send(error);
  }
});

EmployeeRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;

  const employee = await EmployeeModel.find({ _id: id });
  try {
    if (!employee) {
      res.send("You are not Authorized");
    } else {
      await EmployeeModel.findByIdAndUpdate({ _id: id }, req.body);
      res.send("Employee Data Updated");
    }
  } catch (error) {
    res.send(error);
  }
});

EmployeeRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  const employee = await EmployeeModel.find({ _id: id });
  try {
    if (!employee) {
      res.send("You are not Authorized");
    } else {
      await EmployeeModel.findByIdAndDelete({ _id: id });
      res.send("Employee Data Deleted");
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = {
  EmployeeRouter,
};

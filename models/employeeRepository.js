const Employee = require('./employee');

exports.createEmployee = async ({ name, email, password }) => {
  const employee = new Employee({ name, email, password });
  return await employee.save();
};

exports.getEmployeeByEmail = async (email) => {
  return await Employee.findOne({ email });
};

exports.getAllEmployees = async () => {
  return await Employee.find();
};

exports.updateEmployee = async (id, emp) => {
  return await Employee.findByIdAndUpdate(id, emp, { new: true });
};

exports.deleteEmployee = async (id) => {
  return await Employee.findByIdAndDelete(id);
};

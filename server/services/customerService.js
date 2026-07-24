const User = require("../models/User");

// Get all customers
const getCustomers = async () => {
  return await User.find(
    { role: "user" },
    "-password"
  ).sort({ createdAt: -1 });
};

// Get customer by ID
const getCustomerById = async (id) => {
  return await User.findById(id).select("-password");
};

// Block / Unblock customer
const toggleBlockCustomer = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("Customer not found");
  }

  user.isBlocked = !user.isBlocked;

  await user.save();

  return user;
};

// Delete customer
const deleteCustomer = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  getCustomers,
  getCustomerById,
  toggleBlockCustomer,
  deleteCustomer,
};
const customerService = require("../services/customerService");

// Get all customers
const getCustomers = async (req, res) => {
  try {
    const customers = await customerService.getCustomers();

    res.status(200).json({
      success: true,
      count: customers.length,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await customerService.getCustomerById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Block / Unblock customer
const toggleBlockCustomer = async (req, res) => {
  try {
    const customer = await customerService.toggleBlockCustomer(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: customer.isBlocked
        ? "Customer blocked successfully."
        : "Customer unblocked successfully.",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete customer
const deleteCustomer = async (req, res) => {
  try {
    const customer = await customerService.deleteCustomer(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  toggleBlockCustomer,
  deleteCustomer,
};
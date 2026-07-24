const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getCustomers,
  getCustomerById,
  toggleBlockCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

// Apply authentication & admin authorization
router.use(protect, adminOnly);

/**
 * @swagger
 * tags:
 *   name: Admin Customers
 *   description: Admin Customer Management APIs
 */

/**
 * @swagger
 * /api/admin/customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Admin Customers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customers fetched successfully
 */
router.get("/", getCustomers);

/**
 * @swagger
 * /api/admin/customers/{id}:
 *   get:
 *     summary: Get customer by ID
 *     tags: [Admin Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer fetched successfully
 *       404:
 *         description: Customer not found
 */
router.get("/:id", getCustomerById);

/**
 * @swagger
 * /api/admin/customers/{id}/block:
 *   patch:
 *     summary: Block or Unblock customer
 *     tags: [Admin Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer blocked/unblocked successfully
 *       404:
 *         description: Customer not found
 */
router.patch("/:id/block", toggleBlockCustomer);

/**
 * @swagger
 * /api/admin/customers/{id}:
 *   delete:
 *     summary: Delete customer
 *     tags: [Admin Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 */
router.delete("/:id", deleteCustomer);

module.exports = router;
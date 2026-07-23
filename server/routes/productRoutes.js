const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getFeaturedProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const validate = require("../middleware/validationMiddleware");

const {
  productValidation,
} = require("../validators/productValidator");

console.log("productValidation:", typeof productValidation);
console.log("validate:", typeof validate);
console.log("addProduct:", typeof addProduct);
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product Management APIs
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add a new product
 *     description: Creates a new product.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 16 Pro
 *               description:
 *                 type: string
 *                 example: Latest Apple flagship smartphone
 *               brand:
 *                 type: string
 *                 example: Apple
 *               category:
 *                 type: string
 *                 example: Electronics
 *               productType:
 *                 type: string
 *                 example: Mobile
 *               price:
 *                 type: number
 *                 example: 129999
 *               stock:
 *                 type: integer
 *                 example: 25
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/",
  productValidation,
  validate,
  addProduct
);



/**
 * @swagger
 * /api/products/featured:
 *   get:
 *     summary: Get featured products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Featured products fetched successfully
 */
router.get("/featured", getFeaturedProducts);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Get all products with pagination, filters and sorting.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         example: Electronics
 *
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         example: Samsung
 *
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         example: 10000
 *
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         example: 50000
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         example: priceAsc
 *
 *     responses:
 *       200:
 *         description: Product list fetched successfully
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 686f8d1c9f1234567890abcd
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *       404:
 *         description: Product not found
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.put(
  "/:id",
  productValidation,
  validate,
  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product
 *     description: Soft delete a product.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/:id", deleteProduct);

module.exports = router;
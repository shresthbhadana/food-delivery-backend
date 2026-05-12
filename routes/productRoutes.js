const express = require("express");
const router = express.Router();
const productController = require("../controllers/index").productController;
const { authenticate, verifyAdmin, verifyAdminOrVendor } = require("../middleware/authMiddleware"); // fixed: was '../middleware/auth'

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product and Review Management APIs
 */

// ─── ADMIN / VENDOR ROUTES ────────────────────────────────────────────────────

/**
 * @swagger
 * /admin/products/create:
 *   post:
 *     summary: Create a new product (admin / vendor)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - restaurantId
 *               - restaurantName
 *               - vendorId
 *               - vendorPrice
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Veg Burger"
 *               description:
 *                 type: string
 *               restaurantId:
 *                 type: string
 *               restaurantName:
 *                 type: string
 *               vendorId:
 *                 type: string
 *               vendorPrice:
 *                 type: number
 *               price:
 *                 type: number
 *               isAvailable:
 *                 type: boolean
 *               isFeatured:
 *                 type: boolean
 *               spiciness:
 *                 type: integer
 *               cuisines:
 *                 type: array
 *                 items:
 *                   type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *               variants:
 *                 type: array
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/admin/products/create", authenticate, verifyAdminOrVendor, productController.createProduct);

/**
 * @swagger
 * /admin/products/getAll:
 *   get:
 *     summary: Get all products with reviews (admin)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all products
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/admin/products/getAll", authenticate, verifyAdmin, productController.getAllProduct);

/**
 * @swagger
 * /admin/products/getById/{id}:
 *   get:
 *     summary: Get a product by ID with reviews (admin)
 *     tags: [Product]
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
 *         description: Product details
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/admin/products/getById/:id", authenticate, verifyAdmin, productController.getProductById);

/**
 * @swagger
 * /admin/products/update/{id}:
 *   put:
 *     summary: Update a product (admin / vendor)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
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
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               isAvailable:
 *                 type: boolean
 *               isFeatured:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.put("/admin/products/update/:id", authenticate, verifyAdminOrVendor, productController.updateProduct);

/**
 * @swagger
 * /admin/products/delete/{id}:
 *   delete:
 *     summary: Delete a product (admin / vendor)
 *     tags: [Product]
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
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.delete("/admin/products/delete/:id", authenticate, verifyAdminOrVendor, productController.deleteProduct);

/**
 * @swagger
 * /admin/products/deleteReview/{id}:
 *   delete:
 *     summary: Delete a product review by ID (admin)
 *     tags: [Product]
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
 *         description: Review deleted successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.delete("/admin/products/deleteReview/:id", authenticate, verifyAdmin, productController.deleteReviewById);

// ─── USER (CUSTOMER) ROUTES ───────────────────────────────────────────────────

/**
 * @swagger
 * /users/products/getAll:
 *   get:
 *     summary: Customer - get all available products
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/users/products/getAll", authenticate, productController.getAllProduct);

/**
 * @swagger
 * /users/products/getById/{id}:
 *   get:
 *     summary: Customer - get product detail by ID
 *     tags: [Product]
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
 *         description: Product detail with reviews
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/users/products/getById/:id", authenticate, productController.getProductById);

/**
 * @swagger
 * /users/products/addReview/{productId}:
 *   post:
 *     summary: Customer - add a review for a product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - rating
 *             properties:
 *               userName:
 *                 type: string
 *               rating:
 *                 type: number
 *                 example: 4.5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/users/products/addReview/:productId", authenticate, productController.createProductReview);

/**
 * @swagger
 * /users/products/getAllReviewsByProductId/{productId}:
 *   get:
 *     summary: Get all reviews for a product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID to fetch reviews for
 *     responses:
 *       200:
 *         description: List of reviews
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/users/products/getAllReviewsByProductId/:productId", authenticate, productController.getAllReviewByProductId);

module.exports = router;
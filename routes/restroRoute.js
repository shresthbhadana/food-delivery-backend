const express = require("express");
const router = express.Router();

const restroController = require("../controllers/index").restroController;
const { authenticate, verifyAdmin, verifyAdminOrVendor } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Restaurant
 *   description: Restaurant management APIs
 */

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN ROUTES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @swagger
 * /admin/openAndCloseAllRestaurants:
 *   put:
 *     summary: Bulk open or close ALL restaurants
 *     tags: [Restaurant]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isOpen
 *             properties:
 *               isOpen:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: All restaurants status updated
 *       400:
 *         description: isOpen must be a boolean
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.put("/admin/openAndCloseAllRestaurants", authenticate, verifyAdmin, restroController.openAndCloseAllRestaurants);

/**
 * @swagger
 * /admin/restaurants/create:
 *   post:
 *     summary: Create a new restaurant
 *     tags: [Restaurant]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - restaurantName
 *               - vendorId
 *             properties:
 *               restaurantName:
 *                 type: string
 *                 example: "Burger Palace"
 *               vendorId:
 *                 type: string
 *                 example: "vendor_123"
 *               location:
 *                 type: string
 *                 example: "Sector 5, Noida"
 *               isOpen:
 *                 type: boolean
 *                 example: true
 *               isFeatured:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/admin/restaurants/create", authenticate, verifyAdmin, restroController.createRestro);

/**
 * @swagger
 * /admin/restaurants/getAll:
 *   get:
 *     summary: List all restaurants (admin - all statuses)
 *     tags: [Restaurant]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all restaurants
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/admin/restaurants/getAll", authenticate, verifyAdmin, restroController.getAllRestro);

/**
 * @swagger
 * /admin/restaurants/getById/{id}:
 *   get:
 *     summary: Get single restaurant by ID (admin)
 *     tags: [Restaurant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *     responses:
 *       200:
 *         description: Restaurant details
 *       404:
 *         description: Restaurant not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/admin/restaurants/getById/:id", authenticate, verifyAdmin, restroController.getRestroById);

/**
 * @swagger
 * /admin/restaurants/update/{id}:
 *   put:
 *     summary: Update restaurant details (admin)
 *     tags: [Restaurant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restaurantName:
 *                 type: string
 *                 example: "New Name"
 *               location:
 *                 type: string
 *                 example: "Sector 12, Delhi"
 *               isFeatured:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Restaurant updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.put("/admin/restaurants/update/:id", authenticate, verifyAdmin, restroController.updateRestro);

/**
 * @swagger
 * /admin/restaurants/delete/{id}:
 *   delete:
 *     summary: Delete a restaurant (admin)
 *     tags: [Restaurant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *     responses:
 *       200:
 *         description: Restaurant deleted successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.delete("/admin/restaurants/delete/:id", authenticate, verifyAdmin, restroController.deleteRestro);

/**
 * @swagger
 * /admin/restaurants/toggleStatus/{id}:
 *   put:
 *     summary: Open or close a single restaurant (admin / vendor)
 *     tags: [Restaurant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isOpen
 *             properties:
 *               isOpen:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Restaurant status toggled
 *       400:
 *         description: isOpen must be a boolean
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.put("/admin/restaurants/toggleStatus/:id", authenticate, verifyAdminOrVendor, restroController.toggleRestroStatus);

// ─────────────────────────────────────────────────────────────────────────────
// USER (CUSTOMER) ROUTES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @swagger
 * /users/restaurants/getAll:
 *   get:
 *     summary: Customer - browse all open restaurants
 *     tags: [Restaurant]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of open restaurants
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/users/restaurants/getAll", authenticate, restroController.getUserRestaurants);

/**
 * @swagger
 * /users/restaurants/getById/{id}:
 *   get:
 *     summary: Customer - get restaurant detail by ID
 *     tags: [Restaurant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *     responses:
 *       200:
 *         description: Restaurant detail
 *       404:
 *         description: Restaurant not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/users/restaurants/getById/:id", authenticate, restroController.getUserRestaurantById);

module.exports = router;
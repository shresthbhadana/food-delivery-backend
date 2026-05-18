const router = require("express").Router();
const preOrderController = require("../controllers/preOrderController");

/**
 * @swagger
 * tags:
 *   name: PreOrder
 *   description: PreOrder Management API
 */

/**
 * @swagger
 * /users/orders/createPreOrder:
 *   post:
 *     summary: Create a new PreOrder
 *     tags: [PreOrder]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               vendorId:
 *                 type: string
 *               items:
 *                 type: array
 *     responses:
 *       201:
 *         description: PreOrder created successfully
 *       500:
 *         description: Internal server error
 */
router.post(
  "/createPreOrder",
  preOrderController.createPreOrder
);

/**
 * @swagger
 * /users/orders/updatePreOrder/{id}:
 *   put:
 *     summary: Update an existing PreOrder
 *     tags: [PreOrder]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: PreOrder ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: PreOrder updated successfully
 *       500:
 *         description: Internal server error
 */
router.put(
  "/users/orders/updatePreOrder/:id",
  preOrderController.updatePreOrder
);

/**
 * @swagger
 * /users/orders/getPreOrderById/{id}:
 *   get:
 *     summary: Get a PreOrder by ID
 *     tags: [PreOrder]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: PreOrder ID
 *     responses:
 *       200:
 *         description: PreOrder retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get(
  "/users/orders/getPreOrderById/:id",
  preOrderController.getPreOrderById
);

/**
 * @swagger
 * /users/orders/getAllPreOrders:
 *   get:
 *     summary: Get all PreOrders for the logged-in user
 *     tags: [PreOrder]
 *     responses:
 *       200:
 *         description: List of PreOrders
 *       500:
 *         description: Internal server error
 */
router.get(
  "/users/ordersget/getAllPreOrders",
  preOrderController.getAllPreOrders
);

/**
 * @swagger
 * /users/orders/deletePreOrderById/{id}:
 *   delete:
 *     summary: Delete a PreOrder by ID
 *     tags: [PreOrder]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: PreOrder ID
 *     responses:
 *       200:
 *         description: PreOrder deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/users/orders/deletePreOrderById/:id",
  preOrderController.deletePreOrderById
);

/**
 * @swagger
 * /users/orders/acceptOrRejectPreOrder/{id}:
 *   put:
 *     summary: Accept or Reject a PreOrder
 *     tags: [PreOrder]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: PreOrder ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Accepted, Rejected]
 *     responses:
 *       200:
 *         description: PreOrder status updated successfully
 *       500:
 *         description: Internal server error
 */
router.put(
  "/users/orders/acceptOrRejectPreOrder/:id",
  preOrderController.acceptOrRejectPreOrder
);

/**
 * @swagger
 * /users/orders/getAllPreOrdersByVendor:
 *   get:
 *     summary: Get all PreOrders for a specific vendor
 *     tags: [PreOrder]
 *     responses:
 *       200:
 *         description: List of PreOrders for the vendor
 *       500:
 *         description: Internal server error
 */
router.get(
  "users/orders/getAllPreOrdersByVendor",
  preOrderController.getAllPreOrdersByVendor
);

/**
 * @swagger
 * /users/orders/admin/getAllPreOrders:
 *   get:
 *     summary: Admin - Get all PreOrders across all users and vendors
 *     tags: [PreOrder]
 *     responses:
 *       200:
 *         description: Complete list of all PreOrders
 *       500:
 *         description: Internal server error
 */
router.get(
  "/admin/getAllPreOrders",
  preOrderController.adminGetAllPreOrders
);

module.exports = router;
const router = require("express").Router();
const { orderController } = require("../controllers");

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order Management API
 */

/**
 * @swagger
 * /orders-api/order:
 *   post:
 *     summary: Create live order (called internally by scheduler)
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post("/orders-api/order", orderController.createOrder);

/**
 * @swagger
 * /orders-api/updateOrder:
 *   post:
 *     summary: Order state machine - accept / ready / cancel / fulfill
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Order updated successfully
 */
router.post("/orders-api/updateOrder", orderController.updateOrderStatus);

/**
 * @swagger
 * /admin/orders/getAll:
 *   get:
 *     summary: Admin - get all live orders with status/date filters
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/admin/orders/getAll", orderController.adminGetAllOrders);

/**
 * @swagger
 * /admin/orders/getById/{id}:
 *   get:
 *     summary: Admin - get single live order by ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/admin/orders/getById/:id", orderController.adminGetOrderById);

/**
 * @swagger
 * /users/orders/getLiveOrderById/{id}:
 *   get:
 *     summary: Customer - get live order status
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/users/orders/getLiveOrderById/:id", orderController.getLiveOrderById);

/**
 * @swagger
 * /users/orders/getAllLiveOrders:
 *   get:
 *     summary: Customer - get all live orders
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/users/orders/getAllLiveOrders", orderController.getAllLiveOrders);

/**
 * @swagger
 * /vendor/orders/getVendorOrders:
 *   get:
 *     summary: Vendor - get their vendor orders
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/vendor/orders/getVendorOrders", orderController.getVendorOrders);

/**
 * @swagger
 * /vendor/orders/getVendorOrderById/{id}:
 *   get:
 *     summary: Vendor - get single vendor order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/vendor/orders/getVendorOrderById/:id", orderController.getVendorOrderById);

module.exports = router;
const express = require("express");
const router = express.Router();
const driverController = require("../controllers").driverController;
const { authenticate, verifyAdmin } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Driver
 *   description: Driver management APIs
 */

/**
 * @swagger
 * /admin/drivers/getAll:
 *   get:
 *     summary: Get all drivers
 *     tags: [Driver]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Driver list returned successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/admin/drivers/getAll", authenticate, verifyAdmin, driverController.getAllDrivers);

/**
 * @swagger
 * /admin/drivers/getById/{id}:
 *   get:
 *     summary: Get driver by ID
 *     tags: [Driver]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Driver ID
 *     responses:
 *       200:
 *         description: Driver returned successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Driver not found
 *       500:
 *         description: Internal server error
 */
router.get("/admin/drivers/getById/:id", authenticate, verifyAdmin, driverController.getDriverById);

/**
 * @swagger
 * /admin/drivers/update/{id}:
 *   put:
 *     summary: Update a driver
 *     tags: [Driver]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Driver ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: object
 *               fcmToken:
 *                 type: array
 *                 items:
 *                   type: string
 *               isOnline:
 *                 type: boolean
 *               vehicleType:
 *                 type: string
 *               vehicleNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Driver updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.put("/admin/drivers/update/:id", authenticate, verifyAdmin, driverController.updateDriver);

/**
 * @swagger
 * /admin/drivers/delete/{id}:
 *   delete:
 *     summary: Delete a driver
 *     tags: [Driver]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Driver ID
 *     responses:
 *       200:
 *         description: Driver deleted successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.delete("/admin/drivers/delete/:id", authenticate, verifyAdmin, driverController.deletDriver);

/**
 * @swagger
 * /driver/setOnlineStatus/{id}:
 *   put:
 *     summary: Set driver online status
 *     tags: [Driver]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Driver ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isOnline:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Driver status updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.put("/driver/setOnlineStatus/:id", authenticate, driverController.setDriverOnlineStatus);

module.exports = router;
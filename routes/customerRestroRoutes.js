const express = require("express");

const router = express.Router();

const restroController =
  require("../controllers/index").restroController;

const logger = require("../utils/logger");

/**
 * @swagger
 * tags:
 *   name: Customer Restaurant
 *   description: Customer restaurant browsing APIs
 */

/**
 * @swagger
 * /users/restaurants/getAll:
 *   get:
 *     summary: Browse all open restaurants
 *     tags: [Customer Restaurant]
 *     responses:
 *       200:
 *         description: List of open restaurants retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "restro-123"
 *                       restaurantName:
 *                         type: string
 *                         example: "My Restaurant"
 *                       vendorId:
 *                         type: string
 *                         example: "vendor_123"
 *                       location:
 *                         type: string
 *                         example: "Sector 5, Noida"
 *                       isOpen:
 *                         type: boolean
 *                         example: true
 *                       isFeatured:
 *                         type: boolean
 *                         example: false
 *       500:
 *         description: Internal server error
 */
router.get("/getAll", restroController.getAllRestro);

/**
 * @swagger
 * /users/restaurants/getById/{id}:
 *   get:
 *     summary: Get restaurant detail
 *     tags: [Customer Restaurant]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *         example: "restro-123"
 *     responses:
 *       200:
 *         description: Restaurant details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "restro-123"
 *                     restaurantName:
 *                       type: string
 *                       example: "My Restaurant"
 *                     vendorId:
 *                       type: string
 *                       example: "vendor_123"
 *                     location:
 *                       type: string
 *                       example: "Sector 5, Noida"
 *                     isOpen:
 *                       type: boolean
 *                       example: true
 *                     isFeatured:
 *                       type: boolean
 *                       example: false
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Internal server error
 */
router.get("/getById/:id", restroController.getRestroById);

module.exports = router;
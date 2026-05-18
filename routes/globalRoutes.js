const router =
  require("express").Router();

const globalController =
  require("../controllers/index")
    .globalController;

const {
  authenticate,
  verifyAdmin
} = require(
  "../middleware/authMiddleware"
);

/**
 * @swagger
 * tags:
 *   name: Global Settings
 *   description: Platform global settings APIs
 */

/**
 * @swagger
 * /admin/settings:
 *   get:
 *     summary: Get all platform settings
 *     tags: [Global Settings]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Settings fetched successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal server error
 */
router.get(
  "/admin/settings",
  authenticate,
  verifyAdmin,
  globalController.getSettings
);

/**
 * @swagger
 * /admin/settings/commission/{id}:
 *   put:
 *     summary: Update commission percentage
 *     tags: [Global Settings]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - commissionPercentage
 *             properties:
 *               commissionPercentage:
 *                 type: number
 *                 example: 15
 *
 *     responses:
 *       200:
 *         description: Commission updated successfully
 *
 *       400:
 *         description: Invalid request
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal server error
 */
router.put(
  "/admin/settings/commission/:id",
  authenticate,
  verifyAdmin,
  globalController.updateCommission
);

/**
 * @swagger
 * /admin/settings/deliveryCharge/{id}:
 *   put:
 *     summary: Update delivery charge
 *     tags: [Global Settings]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - deliveryCharge
 *             properties:
 *               deliveryCharge:
 *                 type: number
 *                 example: 40
 *
 *     responses:
 *       200:
 *         description: Delivery charge updated successfully
 *
 *       400:
 *         description: Invalid request
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal server error
 */
router.put(
  "/admin/settings/deliveryCharge/:id",
  authenticate,
  verifyAdmin,
  globalController.updateDeliveryCharge
);

module.exports = router;
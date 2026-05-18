const router =
  require("express").Router();

const deliveryChargeController =
  require(
    "../controllers/index"
  ).deliveryChargeController;

const {
  authenticate,
  verifyAdmin,
} = require(
  "../middleware/authMiddleware"
);

/**
 * @swagger
 * tags:
 *   name: Delivery Charges
 *   description: Timed delivery charge override APIs
 */

/**
 * @swagger
 * /admin/deliveryCharges/create:
 *   post:
 *     summary: Create a timed delivery charge override
 *     tags: [Delivery Charges]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - deliveryCharge
 *               - startDate
 *               - endDate
 *             properties:
 *               deliveryCharge:
 *                 type: number
 *                 example: 80
 *
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-05-20T10:00:00Z"
 *
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-05-21T10:00:00Z"
 *
 *               status:
 *                 type: string
 *                 example: "Pending"
 *
 *     responses:
 *       201:
 *         description: Delivery charge override created successfully
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
router.post(
  "/admin/deliveryCharges/create",
  authenticate,
  verifyAdmin,
  deliveryChargeController
    .createDeliveryCharge
);

/**
 * @swagger
 * /admin/deliveryCharges/getAll:
 *   get:
 *     summary: Get all delivery charge overrides
 *     tags: [Delivery Charges]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Delivery charge overrides fetched successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal server error
 */
router.get(
  "/admin/deliveryCharges/getAll",
  authenticate,
  verifyAdmin,
  deliveryChargeController
    .getAllDeliveryCharges
);

/**
 * @swagger
 * /admin/deliveryCharges/update/{id}:
 *   put:
 *     summary: Update a delivery charge override
 *     tags: [Delivery Charges]
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
 *             properties:
 *               deliveryCharge:
 *                 type: number
 *                 example: 100
 *
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-05-22T10:00:00Z"
 *
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-05-23T10:00:00Z"
 *
 *               status:
 *                 type: string
 *                 example: "Pending"
 *
 *     responses:
 *       200:
 *         description: Delivery charge override updated successfully
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
  "/admin/deliveryCharges/update/:id",
  authenticate,
  verifyAdmin,
  deliveryChargeController
    .updateDeliveryCharge
);

/**
 * @swagger
 * /admin/deliveryCharges/delete/{id}:
 *   delete:
 *     summary: Delete a delivery charge override
 *     tags: [Delivery Charges]
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
 *     responses:
 *       200:
 *         description: Delivery charge override deleted successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/admin/deliveryCharges/delete/:id",
  authenticate,
  verifyAdmin,
  deliveryChargeController
    .deleteDeliveryCharge
);

module.exports = router;
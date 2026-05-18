const router =
  require("express")
    .Router();

const paymentController =
  require(
    "../controllers/index"
  ).paymentController;

const {
  authenticate,
  verifyAdmin,
} = require(
  "../middleware/authMiddleware"
);

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management APIs
 */

/**
 * @swagger
 * /users/payments/initiate:
 *   post:
 *     summary: Initiate payment for an order
 *     tags: [Payments]
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
 *               - orderId
 *               - amount
 *
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: "b7d3c5f2-1234-5678-9999-abc123xyz"
 *
 *               amount:
 *                 type: number
 *                 example: 250
 *
 *               currency:
 *                 type: string
 *                 example: "AED"
 *
 *               status:
 *                 type: string
 *                 example: "pending"
 *
 *               gatewayTransactionId:
 *                 type: string
 *                 example: "txn_123456"
 *
 *               paymentMethod:
 *                 type: string
 *                 example: "card"
 *
 *     responses:
 *       201:
 *         description: Payment initiated successfully
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
  "/users/payments/initiate",
  authenticate,
  paymentController
    .initiatePayment
);

/**
 * @swagger
 * /users/payments/getByOrderId/{orderId}:
 *   get:
 *     summary: Check payment status for an order
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Payment fetched successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: Payment not found
 *
 *       500:
 *         description: Internal server error
 */
router.get(
  "/users/payments/getByOrderId/:orderId",
  authenticate,
  paymentController
    .getPaymentByOrderId
);

/**
 * @swagger
 * /admin/payments/refund/{id}:
 *   post:
 *     summary: Issue a refund
 *     tags: [Payments]
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
 *         description: Payment refunded successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: Payment not found
 *
 *       500:
 *         description: Internal server error
 */
router.post(
  "/admin/payments/refund/:id",
  authenticate,
  verifyAdmin,
  paymentController
    .refundPayment
);

/**
 * @swagger
 * /admin/payments/getAll:
 *   get:
 *     summary: List all payments with filters
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         example: completed
 *
 *       - in: query
 *         name: paymentMethod
 *         schema:
 *           type: string
 *         example: card
 *
 *     responses:
 *       200:
 *         description: Payments fetched successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal server error
 */
router.get(
  "/admin/payments/getAll",
  authenticate,
  verifyAdmin,
  paymentController
    .getAllPayments
);

module.exports = router;
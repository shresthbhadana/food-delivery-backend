const router =
  require("express").Router();

const  scheduledMessageController = require("../controllers/index").scheduleMessageController;
const {
  authenticate,
  verifyAdmin,
} = require(
  "../middleware/authMiddleware"
);

/**
 * @swagger
 * tags:
 *   name: Scheduled Messages
 *   description: Scheduled marketing message APIs
 */

/**
 * @swagger
 * /admin/messages/create:
 *   post:
 *     summary: Create a scheduled marketing message
 *     tags: [Scheduled Messages]
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
 *               - title
 *               - message
 *               - scheduledTime
 *               - frequency
 *
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Weekend Offer"
 *
 *               message:
 *                 type: string
 *                 example: "Get 50% OFF on all orders"
 *
 *               isActive:
 *                 type: boolean
 *                 example: true
 *
 *               scheduledTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-05-20T10:00:00Z"
 *
 *               frequency:
 *                 type: string
 *                 example: "daily"
 *
 *     responses:
 *       201:
 *         description: Scheduled message created successfully
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
  "/admin/messages/create",
  authenticate,
  verifyAdmin,
  scheduledMessageController
    .createMessage
);

/**
 * @swagger
 * /admin/messages/getAll:
 *   get:
 *     summary: Get all scheduled marketing messages
 *     tags: [Scheduled Messages]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Scheduled messages fetched successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal server error
 */
router.get(
  "/admin/messages/getAll",
  authenticate,
  verifyAdmin,
  scheduledMessageController
    .getAllMessages
);

/**
 * @swagger
 * /admin/messages/update/{id}:
 *   put:
 *     summary: Update a scheduled marketing message
 *     tags: [Scheduled Messages]
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
 *
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Festival Offer"
 *
 *               message:
 *                 type: string
 *                 example: "Flat 70% OFF today"
 *
 *               isActive:
 *                 type: boolean
 *                 example: true
 *
 *               scheduledTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-05-21T12:00:00Z"
 *
 *               frequency:
 *                 type: string
 *                 example: "every-weeks"
 *
 *     responses:
 *       200:
 *         description: Scheduled message updated successfully
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
  "/admin/messages/update/:id",
  authenticate,
  verifyAdmin,
  scheduledMessageController
    .updateMessage
);

/**
 * @swagger
 * /admin/messages/delete/{id}:
 *   delete:
 *     summary: Delete a scheduled marketing message
 *     tags: [Scheduled Messages]
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
 *         description: Scheduled message deleted successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/admin/messages/delete/:id",
  authenticate,
  verifyAdmin,
  scheduledMessageController
    .deleteMessage
);

module.exports = router;
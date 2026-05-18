const router = require("express").Router();
const notificationController = require("../controllers").notificationController;
const { authenticate } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: Notification management APIs
 */

/**
 * @swagger
 * /users/notifications/getAll:
 *   get:
 *     summary: Get all notifications for the current user
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications returned successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get(
  "/notifications/getAll",
  authenticate,
  notificationController.getAllNotifications
);

/**
 * @swagger
 * /notifications/markNotificationAsRead:
 *   put:
 *     summary: Mark all notifications as read for the current user
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications marked as read successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.put(
  "/notifications/markNotificationAsRead",
  authenticate,
  notificationController.markNotificationAsRead
);

/**
 * @swagger
 * /notifications/deleteAll:
 *   delete:
 *     summary: Delete all notifications for the current user
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications deleted successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/notifications/deleteAll",
  authenticate,
  notificationController.deleteAllNotifications
);

module.exports = router;
const router =
  require("express").Router();

  const userAppVersionController =
    require("../controllers/index").appVersionController;
const {
  authenticate,
  verifyAdmin,
} = require(
  "../middleware/authMiddleware"
);

/**
 * @swagger
 * tags:
 *   name: App Versions
 *   description: User app version tracking APIs
 */

/**
 * @swagger
 * /users/version/addUserAppVersion:
 *   post:
 *     summary: Record user's current app version
 *     tags: [App Versions]
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
 *               - appVersion
 *
 *             properties:
 *               appVersion:
 *                 type: string
 *                 example: "1.0.1"
 *
 *     responses:
 *       201:
 *         description: App version recorded successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal server error
 */
router.post(
  "/users/version/addUserAppVersion",
  authenticate,
  userAppVersionController
    .addUserAppVersion
);

/**
 * @swagger
 * /admin/versions/getAll:
 *   get:
 *     summary: Admin get all user app versions
 *     tags: [App Versions]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Versions fetched successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal server error
 */
router.get(
  "/admin/versions/getAll",
  authenticate,
  verifyAdmin,
  userAppVersionController
    .getAllVersions
);

module.exports = router;
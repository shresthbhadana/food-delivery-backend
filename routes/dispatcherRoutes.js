const express = require("express");

const router = express.Router();

const DispatcherController = require("../controllers/dispatcherController");

const { authenticate, verifyAdmin } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Dispatcher
 *   description: Dispatcher / Sub-Admin Management APIs
 */

/**
 * @swagger
 * /dispatcher/addSubAdmin:
 *   post:
 *     summary: Add a new dispatcher sub-admin
 *     tags: [Dispatcher]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Sub-admin created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post(
  "/admin/addSubAdmin",
  authenticate,
  verifyAdmin,
  DispatcherController.addSubAdmin
);

/**
 * @swagger
 * /dispatcher/getSubAdminById/{id}:
 *   get:
 *     summary: Get a dispatcher sub-admin by ID
 *     tags: [Dispatcher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sub-admin ID
 *     responses:
 *       200:
 *         description: Sub-admin retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get(
  "/admin/getSubAdminById/:id",
  authenticate,
  verifyAdmin,
  DispatcherController.getSubAdminById
);

/**
 * @swagger
 * /dispatcher/getAllSubAdmins:
 *   get:
 *     summary: Get all dispatcher sub-admins
 *     tags: [Dispatcher]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all sub-admins
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get(
  "/admin/getAllSubAdmins",
  authenticate,
  verifyAdmin,
  DispatcherController.getAllSubAdmins
);

/**
 * @swagger
 * /dispatcher/updateUserAndPermissions/{id}:
 *   put:
 *     summary: Update dispatcher sub-admin profile and permissions
 *     tags: [Dispatcher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sub-admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.put(
  "/admin/updateUserAndPermissions/:id",
  authenticate,
  verifyAdmin,
  DispatcherController.updateUserAndPermissions
);

/**
 * @swagger
 * /dispatcher/updatePermissions/{id}:
 *   put:
 *     summary: Update only dispatcher sub-admin permissions
 *     tags: [Dispatcher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sub-admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Permissions updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.put(
  "/admin/updatePermissions/:id",
  authenticate,
  verifyAdmin,
  DispatcherController.updatePermissions
);

/**
 * @swagger
 * /dispatcher/deleteSubAdminById/{id}:
 *   delete:
 *     summary: Delete a dispatcher sub-admin by ID
 *     tags: [Dispatcher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sub-admin ID
 *     responses:
 *       200:
 *         description: Sub-admin deleted successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/admin/deleteSubAdminById/:id",
  authenticate,
  verifyAdmin,
  DispatcherController.deleteSubAdminById
);

module.exports = router;
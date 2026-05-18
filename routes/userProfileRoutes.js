const router = require("express").Router();
const { userProfileController } = require("../controllers");
const {verifyAdmin} = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: User Management
 *   description: Admin APIs for User and Sub-Admin Management
 */

/**
 * @swagger
 * /admin/disableEnableUserAccount:
 *   put:
 *     summary: Enable or disable a local user account
 *     tags: [User Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               isDisabled:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Success
 */
router.put("/admin/disableEnableUserAccount", verifyAdmin, userProfileController.disableEnableUserAccount);

/**
 * @swagger
 * /admin/deleteUserAccount:
 *   delete:
 *     summary: Permanently delete a local user account
 *     tags: [User Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.delete("/admin/deleteUserAccount", verifyAdmin, userProfileController.deleteUserAccount);

/**
 * @swagger
 * /admin/addSubAdmin:
 *   post:
 *     summary: Create local sub-admin profile with permissions
 *     tags: [User Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Success
 */
router.post("admin/addSubAdmin", verifyAdmin, userProfileController.addSubAdmin);

/**
 * @swagger
 * /admin/getSubAdminById/{id}:
 *   get:
 *     summary: Get sub-admin profile + permissions
 *     tags: [User Management]
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
router.get("admin/getSubAdminById/:id", verifyAdmin, userProfileController.getSubAdminById);

/**
 * @swagger
 * /admin/deleteSubAdminById/{id}:
 *   delete:
 *     summary: Delete sub-admin account completely
 *     tags: [User Management]
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
router.delete("admin/deleteSubAdminById/:id", verifyAdmin, userProfileController.deleteSubAdminById);

/**
 * @swagger
 * /admin/updateUserAndPermissions:
 *   put:
 *     summary: Update sub-admin profile and permissions
 *     tags: [User Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 */
router.put("admin/updateUserAndPermissions", verifyAdmin, userProfileController.updateUserAndPermissions);

/**
 * @swagger
 * /admin/users/getAll:
 *   get:
 *     summary: List all users with optional role filter
 *     tags: [User Management]
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("admin/users/getAll", verifyAdmin, userProfileController.adminGetAllUsers);

/**
 * @swagger
 * /admin/users/getById/{id}:
 *   get:
 *     summary: Get any user's profile by ID
 *     tags: [User Management]
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
router.get("admin/users/getById/:id", verifyAdmin, userProfileController.adminGetUserById);

/**
 * @swagger
 * /admin/users/update:
 *   put:
 *     summary: Update any user's profile fields
 *     tags: [User Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 */
router.put("admin/users/update", verifyAdmin, userProfileController.adminUpdateUser);

module.exports = router;

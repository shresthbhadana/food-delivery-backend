const express = require("express");
const router = express.Router();
const promoCodeController = require("../controllers").promoCodeController;
const { authenticate, verifyAdmin } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: PromoCode
 *   description: Promo code and discount management APIs
 */

/**
 * @swagger
 * /admin/getAllPromoCodeAndDiscounts:
 *   get:
 *     summary: Get all promo codes and discounts
 *     tags: [PromoCode]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of promo codes returned successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/admin/getAllPromoCodeAndDiscounts", authenticate, verifyAdmin, promoCodeController.getAllPromoCodes);

/**
 * @swagger
 * /admin/getPromoCodeById/{id}:
 *   get:
 *     summary: Get promo code by ID
 *     tags: [PromoCode]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Promo code ID
 *     responses:
 *       200:
 *         description: Promo code returned successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Promo code not found
 *       500:
 *         description: Internal server error
 */
router.get("/admin/getPromoCodeById/:id", authenticate, verifyAdmin, promoCodeController.getPromoCodeById);

/**
 * @swagger
 * /admin/addPromoCodeAndDiscounts:
 *   post:
 *     summary: Create a new promo code and discount
 *     tags: [PromoCode]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               discount:
 *                 type: number
 *               expiryDate:
 *                 type: string
 *                 format: date
 *               isActive:
 *                 type: boolean
 *             required:
 *               - code
 *               - discount
 *     responses:
 *       201:
 *         description: Promo code created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/admin/addPromoCodeAndDiscounts", authenticate, verifyAdmin, promoCodeController.createPromoCode);

/**
 * @swagger
 * /admin/updatePromoCodeAndDiscount/{id}:
 *   put:
 *     summary: Update an existing promo code
 *     tags: [PromoCode]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Promo code ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               discount:
 *                 type: number
 *               expiryDate:
 *                 type: string
 *                 format: date
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Promo code updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.put("/admin/updatePromoCodeAndDiscount/:id", authenticate, verifyAdmin, promoCodeController.updatePromoCode);

/**
 * @swagger
 * /admin/deletePromoCodeById/{id}:
 *   delete:
 *     summary: Delete a promo code by ID
 *     tags: [PromoCode]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Promo code ID
 *     responses:
 *       200:
 *         description: Promo code deleted successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.delete("/admin/deletePromoCodeById/:id", authenticate, verifyAdmin, promoCodeController.deletePromoCode);

/**
 * @swagger
 * /users/promocode/getAllPromoCodes:
 *   get:
 *     summary: Get all active promo codes for users
 *     tags: [PromoCode]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Active promo codes returned successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/users/promocode/getAllPromoCodes", authenticate, promoCodeController.getActivePromoCodes);

/**
 * @swagger
 * /users/promocode/getPromoCodeById/{id}:
 *   get:
 *     summary: Get promo code details by ID for users
 *     tags: [PromoCode]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Promo code ID
 *     responses:
 *       200:
 *         description: Promo code details returned successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Promo code not found
 *       500:
 *         description: Internal server error
 */
router.get("/users/promocode/getPromoCodeById/:id", authenticate, promoCodeController.getPromoCodeById);

module.exports = router;

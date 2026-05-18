const router = require("express").Router();
const { popularMealController } = require("../controllers/index");
const { authenticate, verifyAdmin } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Popular Meals
 *   description: Popular Meals Management APIs
 */

/**
 * @swagger
 * /popular_meals-api/popularMeals:
 *   post:
 *     summary: Rebuild popular meals collection from order tracker
 *     tags: [Popular Meals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Rebuilt successfully
 *       500:
 *         description: Internal server error
 */
router.post(
  "/popular_meals-api/popularMeals",
  authenticate,
  verifyAdmin,
  popularMealController.rebuildPopularMeals
);

/**
 * @swagger
 * /users/meals/getPopularMeals:
 *   get:
 *     summary: Customer get popular meals list
 *     tags: [Popular Meals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched
 *       500:
 *         description: Internal server error
 */
router.get(
  "/users/meals/getPopularMeals",
  authenticate,
  popularMealController.getPopularMeals
);

module.exports = router;

const db = require("../models/index");
const OrderTracker = db.OrderTracker;
const PopularMeal = db.PopularMeal;

const incrementOrderTracker = async (productId) => {
  const [tracker, created] = await OrderTracker.findOrCreate({
    where: { productId },
    defaults: { orderCount: 1 },
  });

  if (!created) {
    tracker.orderCount += 1;
    await tracker.save();
  }
  return tracker;
};

const getAllOrderTrackers = async () => {
  return await OrderTracker.findAll({
    order: [["orderCount", "DESC"]],
  });
};

const clearPopularMeals = async () => {
  return await PopularMeal.destroy({
    where: {},
    truncate: true,
  });
};

const bulkCreatePopularMeals = async (data) => {
  return await PopularMeal.bulkCreate(data);
};

const getAllPopularMeals = async () => {
  return await PopularMeal.findAll({
    order: [["orderCount", "DESC"]],
  });
};

module.exports = {
  incrementOrderTracker,
  getAllOrderTrackers,
  clearPopularMeals,
  bulkCreatePopularMeals,
  getAllPopularMeals,
};

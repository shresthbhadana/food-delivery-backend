const { popularMealRepo } = require("../repository/index");
const db = require("../models/index");
const Product = db.Product;

const trackOrder = async (productId) => {
  return await popularMealRepo.incrementOrderTracker(productId);
};

const rebuildPopularMeals = async () => {
 
  const trackers = await popularMealRepo.getAllOrderTrackers();
  
  if (!trackers || trackers.length === 0) {
    return { count: 0, message: "No tracked orders found." };
  }


  await popularMealRepo.clearPopularMeals();

 
  const popularMealsData = [];
  
  for (const tracker of trackers) {
    const product = await Product.findByPk(tracker.productId);
    if (product) {
      popularMealsData.push({
        productId: product.id,
        orderCount: tracker.orderCount,
        productData: product.toJSON(),
      });
    }
  }

  if (popularMealsData.length > 0) {
    await popularMealRepo.bulkCreatePopularMeals(popularMealsData);
  }

  return { 
    count: popularMealsData.length, 
    message: "Popular meals rebuilt successfully." 
  };
};

const getPopularMeals = async () => {
  return await popularMealRepo.getAllPopularMeals();
};

module.exports = {
  trackOrder,
  rebuildPopularMeals,
  getPopularMeals,
};

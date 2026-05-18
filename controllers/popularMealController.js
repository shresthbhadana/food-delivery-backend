const { popularMealService } = require("../services/index");

const rebuildPopularMeals = async (req, res) => {
  try {
    const result = await popularMealService.rebuildPopularMeals();
    return res.status(200).json({
      success: true,
      message: result.message,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPopularMeals = async (req, res) => {
  try {
    const meals = await popularMealService.getPopularMeals();
    return res.status(200).json({
      success: true,
      data: meals,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  rebuildPopularMeals,
  getPopularMeals,
};

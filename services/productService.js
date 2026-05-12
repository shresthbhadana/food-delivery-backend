const { productRepo } = require("../repository/index");



const getAllReviewByProductId = async (productId) => {
  if (!productId) throw new Error("productId is required");
  const reviews = await productRepo.getAllReviewsByProductId(productId); 
  if (!reviews || reviews.length === 0) return [];
  return reviews;
};

const deleteReviewById = async (id) => {   
  if (!id) throw new Error("id is required");
  const deleted = await productRepo.deleteReviewById(id);
  if (!deleted) throw new Error("Review not found");
  return deleted;
};

const createProductReview = async (body) => {  
  if (!body) throw new Error("body is required");
  return await productRepo.createReview(body);
};



const createProduct = async (body) => {
  if (!body) throw new Error("body is required");
  return await productRepo.createProduct(body);
};

const getAllProduct = async () => {            
  return await productRepo.getAllProduct();
};

const getProductById = async (id) => {
  if (!id) throw new Error("id is required");
  return await productRepo.getProductById(id);
};

const updateProduct = async (id, body) => {
  if (!id || !body) throw new Error("id and body are required");
  return await productRepo.updateProduct(id, body);
};

const deleteProduct = async (id) => {
  if (!id) throw new Error("id is required");
  return await productRepo.deleteProduct(id);
};

module.exports = {
  getAllReviewByProductId,
  deleteReviewById,
  createProductReview,
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
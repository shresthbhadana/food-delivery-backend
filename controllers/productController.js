const {productService} = require("../services/index");
const logger = require("../utils/logger")

const getAllReviewByProductId = async(req,res)=>{
    const productId = req.params.productId || req.query.productId;
    try{
        const response = await productService.getAllReviewByProductId(productId);
        logger.info("All review fetched successfully")
        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: response,
        });
        
        
    }catch(error){
        logger.error(`Something went wrong in fetching all reviews : ${error}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        })
    }
}
const deleteReviewById = async(req,res)=>{
    const {id} = req.params;
    try{
        const response = await productService.deleteReviewById(id);
        logger.info("Review deleted successfully")
        return res.status(200).json({
            success: true,
            message: "Review deleted successfully",
            data: response,
        });
    }catch(error){
        logger.error(`Something went wrong in deleting review : ${error}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        })
    }
}
const createProduct = async (req, res) => {

  try {

    logger.info("Create product api called");

    const payload = {

      name: req.body.name,

      description: req.body.description,

      restaurantId: req.body.restaurantId,

      restaurantName: req.body.restaurantName,

      vendorId: req.user?.id || req.body.vendorId,

      vendorPrice: req.body.vendorPrice,

      price: req.body.price,

      variants: req.body.variants,

      isAvailable: req.body.isAvailable,

      cuisines: req.body.cuisines,

      categories: req.body.categories,

      spiciness: req.body.spiciness,

      thumbnail: req.body.thumbnail,

      imageList: req.body.imageList,

      isFeatured: req.body.isFeatured,
    };

    const response =
      await productService.createProduct(
        payload
      );

    logger.info(
      `Product created: ${response.id}`
    );

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: response,
    });

  } catch (error) {

    logger.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProduct = async(req,res)=>{
    try{
        const response = await productService.getAllProduct();
        logger.info("All product fetched successfully")
        return res.status(200).json({
            success: true,
            message: "All products fetched successfully",
            data: response,
        });
    }catch(error){
        logger.error(`Something went wrong in fetching all products : ${error}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        })
    }
}
const getProductById = async(req,res)=>{
    const {id} = req.params;
    try{
        const response = await productService.getProductById(id);
        logger.info("Product fetched successfully")
        return res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: response,
        });
    }catch(error){
        logger.error(`Something went wrong in fetching product : ${error}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        })
    }
}
const updateProduct = async (req, res) => {

  try {

    logger.info("Update product api called");

    const { id: productId } = req.params;

    const payload = {

      name: req.body.name,

      description: req.body.description,

      restaurantId: req.body.restaurantId,

      restaurantName: req.body.restaurantName,

      vendorId: req.user?.id || req.body.vendorId,

      vendorPrice: req.body.vendorPrice,

      price: req.body.price,

      variants: req.body.variants,

      isAvailable: req.body.isAvailable,

      cuisines: req.body.cuisines,

      categories: req.body.categories,

      spiciness: req.body.spiciness,

      thumbnail: req.body.thumbnail,

      imageList: req.body.imageList,

      averageRating: req.body.averageRating,

      ratingCount: req.body.ratingCount,

      isFeatured: req.body.isFeatured,
    };

    const response =
      await productService.updateProduct(
        productId,
        payload
      );

    logger.info(
      `Product updated: ${productId}`
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: response,
    });

  } catch (error) {

    logger.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteProduct = async(req,res)=>{
      const {id} = req.params;
  try{
    const response = await productService.deleteProduct(id);
    logger.info("Product deleted successfully")
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: response,
    });
  }catch(error){
    logger.error(`Something went wrong in deleting product : ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}
const createProductReview = async (
  req,
  res
) => {

  try {

    logger.info(
      "Create product review api called"
    );

    const payload = {

      productId: req.params.productId,

      userId:
        req.user?.id || req.body.userId,

      userName: req.body.userName,

      rating: req.body.rating,

      comment: req.body.comment,

      createdAt: Date.now(),
    };

    const response =
      await productService.createProductReview(
        payload
      );

    logger.info(
      `Product review created: ${response.id}`
    );

    return res.status(201).json({
      success: true,
      message:
        "Product review created successfully",
      data: response,
    });

  } catch (error) {

    logger.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
    getAllReviewByProductId,
    deleteReviewById,
    createProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    createProductReview
}
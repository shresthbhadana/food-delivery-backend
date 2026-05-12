const db = require("../models/index")
const { Product, ProductReview } = db;

const getAllReviewsByProductId = async (productId) => {
  return await ProductReview.findAll({
    where: { productId },
    include: [{
      model: Product,
      attributes: ["id", "name", "averageRating"] 
    }],
    order: [["createdAt", "DESC"]]
  });
};
const deleteReviewById=  async(id)=>{
    return await ProductReview.destroy({where : {id}})
}
const createProduct = async(body)=>{
    return await Product.create(body)
};
const getAllProduct = async()=>{return await Product.findAll({
        include:[{
            model:ProductReview,
            attributes:["id","rating","comment","userName","userId","createdAt"]
        }]
    })
};
const getProductById = async(id)=>{
    return await Product.findOne({
        where:{id},
        include:[{
            model:ProductReview,
            attributes:["id","rating","comment","userName","userId","createdAt"]
        }]
    })
};
const updateProduct = async(id,body)=>{
     await Product.update(body,{where:{id}})
     return await Product.findByPk(id)
};
const deleteProduct = async(id)=>{
    return await Product.destroy({where:{id}})
};
const createReview = async(body)=>{
    return await ProductReview.create(body)
};

module.exports = {
    getAllReviewsByProductId,
    deleteReviewById,
    createProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    createReview
}

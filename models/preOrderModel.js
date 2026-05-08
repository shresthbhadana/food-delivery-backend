module.exports = (sequelize, DataTypes) => {
    const preOrder = sequelize.define("preOrder", {
       id :{
        type : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey : true,
       } ,
       items :{
        type :DataTypes.JSON,
        allowNull : false,
       },
       userName :{
        type : DataTypes.STRING,
        allowNull :false,
       },
       phoneNumber :{
        type : DataTypes.STRING,
        allowNull : false,
       },
       userId : {
        type : DataTypes.STRING,
        allowNull : false,
       },
     vendorId: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      createdAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      deliveryAddress: {
        type: DataTypes.JSON,
        allowNull: false,
      },

      deliverySchedule: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      totalPrice : {
        type :DataTypes.FLOAT,
        allowNull : false,
      },
      status : {
        type :DataTypes.ENUM(
          "Pending",
          "Accepted",
          "Rejected",
          "Completed"
        ),
        allowNull : false,
        defaultValue : "Pending",
      },
      commissionPercent : {
        type :DataTypes.FLOAT,
        allowNull : false,
      },
      deliveryCharge : {
        type :DataTypes.FLOAT,
        allowNull : false,
      },
      orderForSomeoneElse : {
        type :DataTypes.BOOLEAN,
        defaultValue : false,
      },
      pickupNumber : {
        type :DataTypes.STRING,
      },
      remark : {
        type :DataTypes.TEXT,
      },
      promoCodeId : {
        type :DataTypes.STRING,
      },
    }, {
      indexes: [
        {
          name: 'pre_orders_user_id_created_at_asc',
          fields: [
            { name: 'userId' }, 
            { name: 'createdAt', order: 'ASC' }
          ]
        },
        {
          name: 'pre_orders_user_id_created_at_desc',
          fields: [
            { name: 'userId' }, 
            { name: 'createdAt', order: 'DESC' }
          ]
        },
        {
          name: 'pre_orders_vendor_id_created_at_asc',
          fields: [
            { name: 'vendorId' }, 
            { name: 'createdAt', order: 'ASC' }
          ]
        },
        {
          name: 'pre_orders_vendor_id_created_at_desc',
          fields: [
            { name: 'vendorId' }, 
            { name: 'createdAt', order: 'DESC' }
          ]
        }
      ]
    });
    return preOrder;
}
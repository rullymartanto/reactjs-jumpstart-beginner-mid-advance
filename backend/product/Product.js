
module.exports = (sequelize, type) => {
  const Product = sequelize.define('Product', {
    productID: {
      type: type.STRING,
      primaryKey: true
    },
    productSKU: {
      type: type.STRING,
    },
    productName: {
      type: type.STRING,
    },
    productPrice: {
      type: type.STRING,
    },
    productWeight: {
      type: type.STRING,
    },
    productCartDesc: {
      type: type.STRING,
    },
    productShortDesc: {
      type: type.STRING,
    },
    productLongDecs: {
      type: type.STRING,
    },
    productThumb: {
      type: type.STRING,
    },
    productImage: {
      type: type.STRING,
    },
    productCategoryId: {
      type: type.STRING,
    },
    mimetype: {
      type: type.STRING,
    },
    filename: {
      type: type.STRING,
    },
    createdAt: type.NOW,
    updatedAt: type.NOW,
  });

  Product.associate = function (models) {
    // Product.hasMany(models.AuthToken);
  };

  return Product;
};
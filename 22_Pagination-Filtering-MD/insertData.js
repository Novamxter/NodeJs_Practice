const mongoose = require('mongoose');
const Product = require('./models/productSchema')

module.exports = async function insertBulkProducts() {
  const bulkData = [];

  for (let i = 1; i <= 100; i++) {
    bulkData.push({
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 1000),
      category: ['electronics', 'furniture', 'clothing'][i % 3],
    });
  }

  await Product.insertMany(bulkData);
  console.log('Bulk data inserted!');
}


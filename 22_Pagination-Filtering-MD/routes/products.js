const express = require("express");
const router = express.Router();
const Product = require('../models/productSchema')

router.get("/products",async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const { category, minPrice, maxPrice } = req.query;

  const filter = {};
  if (category) filter.category = category;
  if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };    // existing , adding new property
  if (maxPrice) filter.price = {...filter.price, $lte: Number(maxPrice)}     

  try{
    const products = await Product.find(filter).skip(skip).limit(limit).sort({createdAt:-1})

    const total = await Product.countDocuments(filter)

    res.json({
      page,
      limit,
      totalPages: Math.ceil(total/limit),
      totalResults:total,
      products
    })
  }catch(err){
    res.status(500).json({message:"Server Error"})
  }
});

module.exports = router
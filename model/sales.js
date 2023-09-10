// models/sale.js
const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  product: String,
  quantity: Number,
  price: Number,
  date: Date,
});

module.exports = mongoose.model('Sale', saleSchema);

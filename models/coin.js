const mongoose = require('mongoose');
const CoinSchema = mongoose.Schema(
  {
    coinName: String,
    coinPrice: Number
  },
  {
    created_at: true,
    updated_at: true,
  },
);

module.exports = Coin = mongoose.model('Coin', CoinSchema);
const mongoose = require('mongoose');
const LastDepositsSchema = mongoose.Schema(
  {
    userName: String,
    amount: Number,
    date: String
  },
  {
    created_at: true,
    updated_at: true,
  },
);

module.exports = LastDeposits = mongoose.model('LastDeposits', LastDepositsSchema);
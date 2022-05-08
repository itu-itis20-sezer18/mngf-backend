const mongoose = require('mongoose');
const WithdrawalSchema = mongoose.Schema(
  {
    userId: {
      type: String,
    },

    selectedCoin: {
        type: String,
        default: "BTC"
      },

    amount: Number,

    methodCurrency: {
        type: String,
        default: "USD"
      },
    status: String,
    requestedAt: Date,
    wallet: String

  },
  {
    created_at: true,
    updated_at: true,
  },
  
);

module.exports = Withdrawal = mongoose.model('Withdrawal', WithdrawalSchema);
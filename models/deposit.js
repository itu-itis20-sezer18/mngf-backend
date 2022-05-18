const mongoose = require('mongoose');
const DepositSchema = mongoose.Schema(
  {
    userId: {
      type: String,
    },

    selectedCoin: {
        type: String,
        default: "BTC"
      },

    amount: Number,
    interestRate: Number,
    amountInMngf: Number,

    methodCurrency: {
        type: String,
        default: "USD"
      },

    plan: String,
    endDate: String,
    amountWillBeRecieved: Number,
    status: String
  },
  {
    created_at: true,
    updated_at: true,
  },
);

module.exports = Deposit = mongoose.model('Deposit', DepositSchema);
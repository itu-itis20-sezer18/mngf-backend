const mongoose = require('mongoose');
const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    firstName: String,
    lastName: String,
    phoneNumber: {
        type: String,
        unique: true,
      },
    balances: {
      MNGF:  {
        type: Number,
      },
      BTC:  {
        type: Number,
      },
      USDT:  {
        type: Number,
      },
      LTC:  {
        type: Number,
      },
      ETH:  {
        type: Number,
      }
    },
    depositAddresses: {
      BTC:  {
        type: String,
        unique: true,
      },
      USDT:  {
        type: String,
        unique: true,
      },
      LTC:  {
        type: String,
        unique: true,
      },
      ETH:  {
        type: String,
        unique: true,
      }
    },
    password: String,
    country: String,
    imageUrl: {
      url: {
        type: String,
        default: "/assets/img/user2.svg"
      }
    },
      ref: {
        type: String,
        default: ""
      },
      wallet: {
        type: String,
      },
      createdAt: String

      
      
    
  },
  {
    created_at: true,
    updated_at: true,
  },
);

module.exports = User = mongoose.model('User', UserSchema);
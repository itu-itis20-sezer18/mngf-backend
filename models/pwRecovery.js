const mongoose = require('mongoose');
const pwRecoverySchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    generatedCode: String
  },
  {
    created_at: true,
    updated_at: true,
  },
);

module.exports = pwRecovery = mongoose.model('pwRecovery', pwRecoverySchema);
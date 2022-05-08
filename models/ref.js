const mongoose = require('mongoose');
const RefSchema = mongoose.Schema(
  {
    userId: String,
    referencedByUserId: String,
    refDate: String,
    didInvest: Boolean
  },
  {
    created_at: true,
    updated_at: true,
  },
);

module.exports = Ref = mongoose.model('Ref', RefSchema);
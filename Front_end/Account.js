const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  accountType: { type: String, required: true },
  balance: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;

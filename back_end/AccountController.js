const asyncHandler = require('express-async-handler');
const Account = require('../models/Account');

const getAccounts = asyncHandler(async (req, res) => {
  const accounts = await Account.find({ user: req.user._id });
  res.json(accounts);
});

const createAccount = asyncHandler(async (req, res) => {
  const { accountType, balance } = req.body;

  const account = new Account({
    user: req.user._id,
    accountType,
    balance,
  });

  const createdAccount = await account.save();
  res.status(201).json(createdAccount);
});

const getAccountById = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id);

  if (account) {
    res.json(account);
  } else {
    res.status(404);
    throw new Error('Account not found');
  }
});

const updateAccount = asyncHandler(async (req, res) => {
  const { accountType, balance } = req.body;

  const account = await Account.findById(req.params.id);

  if (account) {
    account.accountType = accountType || account.accountType;
    account.balance = balance || account.balance;

    const updatedAccount = await account.save();
    res.json(updatedAccount);
  } else {
    res.status(404);
    throw new Error('Account not found');
  }
});

const deleteAccount = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id);

  if (account) {
    await account.remove();
    res.json({ message: 'Account removed' });
  } else {
    res.status(404);
    throw new Error('Account not found');
  }
});

module.exports

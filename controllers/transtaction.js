const transactionService = require("../services/transaction.service");

const { errorHandler } = require("../utils/error");

exports.transfer = async (req, res) => {
  try {
    const _res = await transactionService.createTransaction(req.body, req.user);
    res.status(200).json({ _res });
  } catch (error) {
    errorHandler(error, res);
  }
};

exports.getAccountBaance = async (req, res) => {
  try {
    const _res = await transactionService.getBalance(req.user);
    res.status(200).json({ ammout: _res });
  } catch (error) {
    errorHandler(error, res);
  }
};

exports.myacctNo = async (req, res) => {
  try {
    const _res = await transactionService.getMYaccNo(req.user);
    res.status(200).json({ acctNo: _res });
  } catch (error) {
    errorHandler(error, res);
  }
};

exports.getAccountName = async (req, res) => {
  try {
    const _res = await transactionService.AccountName(req.body);
    res.status(200).json({ _res });
  } catch (error) {
    errorHandler(error, res);
  }
};

exports.getMyAccountName = async (req, res) => {
  try {
    const _res = await transactionService.getMYaccName(req.user);
    res.status(200).json({ _res });
  } catch (error) {
    errorHandler(error, res);
  }
};

exports.getTransactionHistory = async (req, res) => {
  try {
    const _res = await transactionService.transferHistory(req.user);
    res.status(200).json({ transferHistory: _res });
  } catch (error) {
    errorHandler(error, res);
  }
};

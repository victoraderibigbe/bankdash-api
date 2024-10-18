const { transfer } = require("../controllers/transtaction");
const db = require("../model");
const { AppError } = require("../utils/error");
const transfersHistory = db.Transaction;
const userModels = db.User;
const { Op } = require("sequelize");

class Transaction {
  async createTransaction(data, userId) {
    try {
      const { transaction_amount, transaction_type, transfer_to, description } =
        data;
      if (!userId) {
        new AppError("login", 400);
      }
      const account = await db.Account.findOne({ where: { UserId: userId } });
      if (parseFloat(transaction_amount) <= parseFloat(50)) {
        throw new AppError("Transaction amount must be greater than 50", 400);
      }
      if (
        transaction_type !== "withdrawal" &&
        transaction_type !== "transfer"
      ) {
        throw new AppError(
          "Transaction type must be withdrawal or transfer",
          400
        );
      }
      if (account) {
        if (transaction_type === "withdrawal") {
          account.AccountBalance =
            parseInt(account.AccountBalance) - parseInt(transaction_amount);
        }
        if (account.AccountBalance < 50) {
          throw new AppError("Insufficient funds", 400);
        } else if (transaction_type === "transfer") {
          account.AccountBalance =
            parseInt(account.AccountBalance) - parseInt(transaction_amount);
        }
        if (account.AccountBalance <= 50) {
          throw new AppError("Insufficient funds", 400);
        }
        const transferToAccount = await db.Account.findOne({
          where: { AccountNumber: transfer_to },
        });
        if (transferToAccount) {
          transferToAccount.AccountBalance =
            parseInt(transferToAccount.AccountBalance) +
            parseInt(transaction_amount);
          await transferToAccount.save();
        } else {
          throw new AppError("Account not found", 400);
        }
        await account.save();
        const generateTransferId = Math.floor(10000 + Math.random() * 900);
        const transaction = transferHistory.create({
          Transaction_Id: generateTransferId,
          UserId: account.UserId,
          Account_id: transferToAccount.UserId,
          Transaction_message: description,
          Transaction_amount: transaction_amount,
          Transaction_Type: transaction_type,
        });
        return true;
      }
    } catch (error) {
      throw error;
    }
  }

  async transferHistory(userId) {
    try {
      const transferHistory = await transfersHistory.findAll({
        where: {
          [Op.or]: [{ UserId: userId }, { Account_id: userId }],
        },
      });
      console.log(transferHistory);
      return transferHistory;
    } catch (error) {
      throw error;
    }
  }

  async getBalance(userId) {
    try {
      if (!userId) {
        throw new AppError("login", 400);
      }
      const getBalance = await db.Account.findOne({
        where: { userId: userId },
      });
      return getBalance.AccountBalance;
    } catch (error) {
      throw error;
    }
  }

  async getMYaccNo(userId) {
    try {
      if (!userId) {
        throw new AppError("login", 400);
      }
      const getBalance = await db.Account.findOne({
        where: { userId: userId },
      });
      return getBalance.AccountNumber;
    } catch (error) {
      throw error;
    }
  }

  async getMYaccName(userId) {
    try {
      if (!userId) {
        throw new AppError("login", 400);
      }
      const accountName = await db.User.findOne({ where: { userId: userId } });
      return {
        first_name: accountName.firstname,
        last_name: accountName.lastname,
        middle_name: accountName.middlename,
      };
    } catch (error) {
      throw error;
    }
  }

  async AccountName(data) {
    try {
      const { transfer_to } = data;
      if (!transfer_to) {
        throw new AppError("invalid detail", 400);
      }
      const accountNumber = await db.Account.findOne({
        where: { AccountNumber: transfer_to },
      });
      if (!accountNumber) {
        throw new AppError("check the account", 400);
      }
      const accountName = await db.User.findOne({
        where: { userId: accountNumber.UserId },
      });
      if (!accountName) {
        throw new AppError("check the account", 400);
      }
      return {
        first_name: accountName.firstname,
        last_name: accountName.lastname,
        middle_name: accountName.middlename,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Transaction();

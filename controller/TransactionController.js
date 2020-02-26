import conn from '../helper/conn';
import queryController from '../helper/db';
import { generateNumber } from '../helper/generateRandom';

const client = conn();
client.connect();

class TransactionController {
  /**
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */
  static debitOrCredit(request, response) {
    const {
      amount, currency, channel, debitOrCredit,
      narration, transactionTime, valueDate,
      balanceAfter
    } = request.body;
    const { accountNumber } = request.params;
    const accountBalance = `SELECT * FROM customerBalance WHERE accountNumber ='${accountNumber}'`;

    if (/^\d{10}$/.test(accountNumber)) {
      return response.status(400).json({
        status: 400,
        message: `Invalid account Number`
      });
    }
    const randomNumber = generateNumber();
    const query = {
      text:
        // eslint-disable-next-line max-len
        'INSERT INTO products(accountNumber, amount, currency, channel, debitOrCredit, narration, referenceId, transactionTime, valueDate, balanceAfter) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      values: [
        accountNumber, amount, currency, channel, debitOrCredit,
        narration, randomNumber, transactionTime, valueDate,
        balanceAfter
      ]
    };
    if (debitOrCredit === 'credit') {
      queryController.dbQuery(response, query, 'Account have been credited', 'account not found');
    }
    if (debitOrCredit === 'debit') {
      client.query(accountBalance)
        .then((dbResult) => {
          if (dbResult.rowCount > 0) {
            if (dbResult.rows[0].availableBalance - dbResult.rows[0].minimumBalance >= amount) {
              queryController.dbQuery(response, query, 'Account have been debited');
            } else {
              return response.status(200).json({
                status: 200,
                error: 'Insufficient fund',
              });
            }
          }
        });
    }
  }
}

export default TransactionController;

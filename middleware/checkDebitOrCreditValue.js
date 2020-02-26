import { check } from 'express-validator';

const checkDebitOrCreditValue = [
  check('amount', 'Amount field is required')
    .isFloat()
    .withMessage('Amount should be a floating number'),
  check('currency', 'Currency is required')
    .not()
    .isEmpty()
    .isString()
    .withMessage('Currency field should be a string')
    .trim(),
  check('channel', 'channel is required')
    .not()
    .isEmpty()
    .isString()
    .withMessage('channel field should be a string')
    .trim(),
  check('debitOrCredit', 'debitOrCredit field is required')
    .not()
    .isEmpty()
    .isString()
    .withMessage('debitOrCredit should be a string')
    .trim(),
  check('narration', 'narration field is required')
    .not()
    .isEmpty()
    .isString()
    .withMessage('narration field should be a string')
    .trim(),
  check('referenceId', 'reference Id is required')
    .not()
    .isEmpty()
    .isInteger()
    .withMessage('reference Id field should be an integer'),
  check('transactionTime', 'transactionTime is required')
    .custom(value => value.match(/^\d{4}-\d{2}-\d{2}$/))
    .withMessage('transactionTime is not valid'),
  check('transactionType', 'transactionType field is required')
    .not()
    .isEmpty()
    .isString()
    .withMessage('transactionType field should be a string'),
  check('valueDate', 'valueDate')
    .custom(value => value.match(/^\d{4}-\d{2}-\d{2}$/))
    .withMessage('valueDate field is not valid'),
  check('balanceAfter')
    .isFloat()
    .withMessage('BalanceAfter field should be a float')
    .optional()
];

export default checkDebitOrCreditValue;

const createCustomerDetailsTable = `
  CREATE TABLE IF NOT EXISTS customerDetails(
    accountNumber VARCHAR(10) PRIMARY KEY NOT NULL,
    accountName VARCHAR(40) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    accountOpeningDate TIMESTAMP WITH TIME ZONE NOT NULL,
    lastTransactionDate TIMESTAMP WITH TIME ZONE DEFAULT now(),
    accountType VARCHAR(20) NOT NULL,
    bvn VARCHAR(11) NOT NULL,
    fullname VARCHAR(40) NOT NULL,
    phoneNumber VARCHAR(15) NOT NULL,
    email VARCHAR(40),
    status VARCHAR(10) DEFAULT 'active'
  );
`;

const createCustomerBalanceTable = `
  CREATE TABLE IF NOT EXISTS customerBalance(
    accountNumber VARCHAR(10) REFERENCES customerDetails(accountNumber) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    availableBalance NUMERIC NOT NULL,
    clearedBalance NUMERIC,
    unclearBalance NUMERIC,
    holdBalance NUMERIC,
    minimumBalance NUMERIC
  );
`;
const createTransactionDetailsTable = `
  CREATE TABLE IF NOT EXISTS transactionDetails(
    accountNumber INTEGER REFERENCES customerDetails(id) NOT NULL,
    amount NUMERIC,
    currency VARCHAR(10) NOT NULL,
    channel VARCHAR(50) NOT NULL,
    debitOrCredit VARCHAR(20) NOT NULL,
    narration TEXT NOT NULL,
    referenceId INTEGER NOT NULL,
    transactionTime TIMESTAMP WITH TIME ZONE DEFAULT now(),
    transactionType VARCHAR(20),
    valueDate TIMESTAMP WITH TIME ZONE,
    balanceAfter NUMERIC
  );
`;
const createQuery = `${createCustomerDetailsTable}${createCustomerBalanceTable}${createTransactionDetailsTable}`;
export default createQuery;

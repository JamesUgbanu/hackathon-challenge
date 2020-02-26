const customerDetails = 'DROP TABLE IF EXISTS customerDetails CASCADE; ';
const customerBalance = 'DROP TABLE IF EXISTS customerBalance CASCADE; ';
const transactionDetails = 'DROP TABLE IF EXISTS transactionDetails CASCADE; ';

const destroyQuery = `${customerDetails}${customerBalance}${transactionDetails}`;

export default destroyQuery;

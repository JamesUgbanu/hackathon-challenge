import Express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import TransactionController from '../middleware/checkDebitOrCreditValue';
import validation from '../middleware/validator';
import TransactionController from '../controller/TransactionController';

dotenv.config();
const port = 3000;
// declare constants
const app = new Express();

app.use(bodyParser.urlencoded({
    extended: false,
  }));

app.use(bodyParser.json());

app.post('/api/v1/creditOrDebit', checkNewProduct, validation.validatorError, TransactionController.debitOrCredit);

// declare 404 route
app.all('*', (req, res) => res.status(404).json({
    status: 404,
    error: 'The URL you are trying to access does not exist. Please enter a valid url',
}));
  
// listen to app port
app.listen(port, () => console.log(`App listening on port ${port}`));
  
export default app;
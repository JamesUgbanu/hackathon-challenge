import conn from './conn';

const client = conn();
client.connect();

class queryController {
  /**
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */

  static notFoundError(response, errorMsg) {
    return response.status(200).json({
      status: 200,
      message: errorMsg,
      data: []
    });
  }

  static getSuccess(response, status, dbresult, successMsg) {
    return response.status(status).json({
      status,
      message: successMsg,
      data: dbresult.rows
    });
  }

  static serverError(response, error) {
    return response.status(500).json({
      status: 500,
      message: `Server error ${error}`
    });
  }

  static dbQuery(response, query, message, notFound) {
    client
      .query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          return queryController.notFoundError(response, notFound);
        }
        queryController.getSuccess(response, 200, result, message);
      })
      .catch(error => queryController.serverError(response, error));
  }
}

export { queryController, client };

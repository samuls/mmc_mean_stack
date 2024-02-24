import connection from "../config/db.config.js";

const QueryExecutor = (query, params = []) => {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

export default QueryExecutor;

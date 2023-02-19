exports.success = (message, results, statusCode) => {
  return {
    message,
    error: false,
    code: statusCode,
    results,
  };
};

exports.error = (err) => {
  const codes = [200, 201, 400, 401, 404, 403, 422, 500];
  let statusCode = err.statusCode;
  const findCode = codes.find((code) => code == statusCode);

  if (!findCode) statusCode = 500;
  else statusCode = findCode;

  return {
    message: err.message,
    type: err.name,
    detail: err.details,
    code: statusCode,
    error: true,
  };
};

const errorHandler = (error, req, res, next) => {
  const message = error.message || "Server Error";
  const data = {
    method: req.method,
    url: req.originalUrl,
    error: message,
  };
  return res.status(res.statusCode || 500).json(data);
};

export { errorHandler };

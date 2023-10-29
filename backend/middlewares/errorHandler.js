const notFound = (req, res, next) => {
  const error = new Error(`${req.url} - not found`);
  res.statusCode = 404;
  next(error);
};

const errorHandler = (error, req, res, next) => {
  let statusCode = res?.statusCode === 200 ? 500 : res?.statusCode;
  let message = error?.message;

  if (error?.name === "CastError" && error?.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "dev" ? error?.stack : null,
  });
};

module.exports = { notFound, errorHandler };

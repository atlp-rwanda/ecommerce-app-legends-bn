//handling try catch block function
export const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      res.status(500).json({
        status: req.t('fail'),
        message: err.errors ? err.errors[0].message : err.message,
      });
    }
  };
};

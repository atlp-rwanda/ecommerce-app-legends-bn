export const checkEmptyFields = (req, res, next) => {
  for (let field in req.body) {
    if (req.body[field] === '') {
     return res.status(409).json({ message: `Please fill the ${field} field` });
    }
  }
  return next;
};

export default {
  root: (req, res) => res.status(200).json({ message: req.t('hello_message') }),
};

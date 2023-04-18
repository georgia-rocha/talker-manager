const validateName = (req, res, next) => {
  const { name } = req.body;
  const nameLength = 3;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < nameLength) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

module.exports = {
  validateName,
};

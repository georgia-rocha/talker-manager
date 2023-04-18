const validateAge = (req, res, next) => {
  const { age } = req.body;
  const ageMin = 18;

  if (age === undefined) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (!Number.isInteger(age) || age <= ageMin) {
    return res.status(400)
    .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }

  next();
};

module.exports = {
  validateAge,
};

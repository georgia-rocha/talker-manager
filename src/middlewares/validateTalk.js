const validateTalkWatchedAt = (req, res, next) => {
    const { talk } = req.body;
    const formatoData = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  
    if (!talk) {
      return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
  
    if (!talk.watchedAt) {
      return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }

    if (!formatoData.test(talk.watchedAt)) {
      return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }

    next();
  };
  
  const valideteTalkRate = (req, res, next) => {
    const { talk } = req.body;

    if (talk.rate === undefined) {
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }

    if (!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
      return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    next();
  };
  
  module.exports = {
    validateTalkWatchedAt,
    valideteTalkRate,
  };
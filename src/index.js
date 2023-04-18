const express = require('express');
const generateToken = require('./utils/generateToken');
const { validateEmail, validatePassword } = require('./middlewares/validateLogin');

const app = express();
app.use(express.json());
const talker = require('./talker');

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const data = await talker.getAllTalker();
  res.status(HTTP_OK_STATUS).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await talker.getTalkerById(Number(id));
  if (!data) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(data);
});

app.post('/login', validateEmail, validatePassword, (req, res) => {
  const { email, password } = req.body;

  if ([email, password].includes(undefined)) {
    return res.status(401).json({ message: 'Campos ausentes!' });
  }
  const token = generateToken();
  return res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});

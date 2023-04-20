const express = require('express');
const generateToken = require('./utils/generateToken');
const { validateEmail, validatePassword } = require('./middlewares/validateLogin');
const { validateTalkWatchedAt, valideteTalkRate } = require('./middlewares/validateTalk');
const { auth } = require('./middlewares/auth');
const { validateAge } = require('./middlewares/validateAge');
const { validateName } = require('./middlewares/validateName');
const { addTalker, updateTalker, deleteTalker, getAllTalker } = require('./talker');

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

app.post('/talker',
validateTalkWatchedAt,
valideteTalkRate,
auth,
validateAge,
validateName,
async (req, res) => {
  try {
    const data = await getAllTalker();
    const newTalker = { id: data.length + 1, ...req.body };
    await addTalker(newTalker);
    return res.status(201).json(newTalker);
  } catch (e) {
    console.error(e);
  }
});

app.put('/talker/:id',
validateTalkWatchedAt,
valideteTalkRate,
auth,
validateAge,
validateName,
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const updatedTalker = await updateTalker(Number(id), { name, age, talk });

  if (!updatedTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  
  return res.status(200).json(updatedTalker);
});

app.delete('/talker/:id', auth, async (req, res) => {
  const { id } = req.params;
  const talkerDeleted = await deleteTalker(id);
  if (!talkerDeleted) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});

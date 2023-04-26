const fs = require('fs').promises;
const { join } = require('path');

const path = '/talker.json';

const readTalkerFile = async () => {
  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(contentFile);
  } catch (error) {
    return null;
  }
};

const getAllTalker = async () => {
  try {
    const talker = await readTalkerFile();
    return talker;
  } catch (error) {
    console.error(error);
  }
};

const getTalkerById = async (id) => {
  const talker = await readTalkerFile();
  return talker.find((user) => user.id === id);
};

const findTalker = async (q, rate, date) => {
  const talkers = await getAllTalker();
  let talkersByQuery = talkers;

  if (q) {
    talkersByQuery = talkersByQuery
      .filter((talk) => talk.name.toLowerCase().includes(q.toLowerCase()));
  }

  if (rate) {
    talkersByQuery = talkersByQuery.filter((talk) => talk.talk.rate === rate);
  }

  if (date) {
    talkersByQuery = talkersByQuery.filter((talk) => talk.talk.watchedAt === date);
  }
  return talkersByQuery;
};

const addTalker = async (content) => {
  try {
    const allTalkers = await getAllTalker();
    const newTalkers = [...allTalkers, content];
    const completePath = join(__dirname, path);
    await fs.writeFile(completePath, JSON.stringify(newTalkers));
  } catch (error) {
    console.error('Erro ao salvar o arquivo', error.message);
    return null;
  }
};

const updateTalker = async (id, update) => {
  try {
    const talkers = await readTalkerFile();
    const talkerFound = talkers.find((talker) => talker.id === id);
    console.log(talkerFound);
    if (!talkerFound) {
      return false;
    }
    const newTalker = { ...talkerFound, ...update };
    talkers[talkerFound.id - 1] = { ...newTalker };
    const completePath = join(__dirname, path);
    await fs.writeFile(completePath, JSON.stringify(talkers));
    return newTalker;
  } catch (e) {
    console.error(e);
  }
};

const talkerPatch = async (id, rate) => {
  const talkers = await getAllTalker();

  const filteredTalkers = talkers.find((talk) => talk.id === Number(id));
  
  filteredTalkers.talk.rate = rate;
  delete filteredTalkers.id;

  await updateTalker(Number(id), filteredTalkers);
};

const deleteTalker = async (id) => {
  const talkers = await readTalkerFile();
  const talkerFound = talkers.findIndex((talker) => talker.id === Number(id));
  console.log(talkerFound);
  if (talkerFound === undefined) {
    return false;
  }
  talkers.splice(talkerFound, 1);
  const completePath = join(__dirname, path);
  await fs.writeFile(completePath, JSON.stringify(talkers));
  return true;
};

module.exports = {
  getAllTalker,
  getTalkerById,
  addTalker,
  updateTalker,
  deleteTalker,
  findTalker,
  talkerPatch,
};
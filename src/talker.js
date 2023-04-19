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
  const talkers = await readTalkerFile();
  const talkerFound = talkers.find((talker) => talker.id === id);
  if (!talkerFound) {
    return false;
  }
  const newTalker = { ...talkerFound, ...update };
  talkers[talkerFound.id - 1] = { ...newTalker };
  console.log(talkers);
  const completePath = join(__dirname, path);
  await fs.writeFile(completePath, JSON.stringify(talkers));
  return newTalker;
};

module.exports = {
    getAllTalker,
    getTalkerById,
    addTalker,
    updateTalker,
};
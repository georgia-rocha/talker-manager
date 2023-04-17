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
    const talker = await readTalkerFile();
    return talker;
};

const getTalkerById = async (id) => {
    const talker = await readTalkerFile();
    return talker.find((user) => user.id === id);
};

module.exports = {
    getAllTalker,
    getTalkerById,
};
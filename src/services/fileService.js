import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFilePath = (filename) => path.join(__dirname, `../data/${filename}`);

const readJson = async (filename) => {
    try {
        const data = await fs.readFile(getFilePath(filename), 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error al leer ${filename}:`, error);
        return [];
    }
};

const writeJson = async (filename, data) => {
    try {
        await fs.writeFile(getFilePath(filename), JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(`Error al escribir ${filename}:`, error);
    }
};

export default {
    readJson,
    writeJson
};
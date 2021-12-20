/*
    fileLoading.js | Mrthomas20121 - 2021
    Load the toml files
*/
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import voidLogger from 'void-logger';
import { parse } from '@iarna/toml';
const logger = new voidLogger('void-wiki').setLogLocation('.');

const loadPages = () => {
    let files = [];
    let f = './docs/page';
    const folder = readdirSync(f);
    for(let file of folder) {
        // only load .md files
        if(file.endsWith('.md')) {
            let file_path = join(f, file);
            let name = file.split('.')[0];
            logger.info(`Loading page: ${file}`);
            files.push(`include:markdown-it ./page/${file}`);
        }
    }
    return files;
}
import { renderFile } from 'pug'
import { loadTOML, loadPages } from '../library/app.js';
import { writeFileSync } from 'fs';
let config = loadTOML('../config.toml')
let data = renderFile('./index.pug', {
    list:['test', 'test2'],
    config:config
})

writeFileSync('../abc.html', data)
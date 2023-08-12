const os = require('os');

const homeDirectory = os.homedir();
const platformType = os.platform();

console.log('Домашняя директория:', homeDirectory);
console.log('Тип операционной платформы:', platformType);
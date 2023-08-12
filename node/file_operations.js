const fs = require('fs');

// Чтение файла
fs.readFile('text.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Ошибка чтения файла:', err);
        return;
    }

    // Переворачивание строки
    const reversedData = data.split('').reverse().join('');

    // Запись в новый файл
    fs.writeFile('reversed_text.txt', reversedData, 'utf8', (err) => {
        if (err) {
            console.error('Ошибка записи файла:', err);
            return;
        }

        console.log('Файл успешно перевернут и записан в reversed_text.txt');
    });
});
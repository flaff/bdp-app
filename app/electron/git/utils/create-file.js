const
    fs = require('fs');

const
    createFile = (path, content) => {
        const writeStream = fs.createWriteStream(path);
        writeStream.write(content || '');
        writeStream.end();
    };

module.exports = createFile;

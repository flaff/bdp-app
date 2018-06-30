const
    mkdirp = require('mkdirp'),
    {promisify} = require('util'),
    asyncMkdirp = promisify(mkdirp);

const
    createFolder = (path) => asyncMkdirp(path);

module.exports = createFolder;

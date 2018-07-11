const
    mkdirp = require('mkdirp'),
    Promise = require('bluebird'),
    asyncMkdirp = Promise.promisify(mkdirp);

const
    createFolder = (path) => asyncMkdirp(path);

module.exports = createFolder;

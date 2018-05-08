const
    mkdirp = require('mkdirp'),
    {promisify} = require('util'),
    mkdirpPromisifed = promisify(mkdirp);

const
    createFolder = (path) => mkdirpPromisifed(path);

module.exports = createFolder;

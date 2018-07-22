const
    fse = require('fs-extra-promisify'),
    path = require('path'),
    Promise = require('bluebird');

const
    blackList = ['.git'],
    filterOutBlacklisted = (fileNames) => fileNames.filter((fileName) => blackList.indexOf(fileName) === -1),

    getFileNames = (filesPath) =>
        console.log('getFileNames:start', filesPath) ||
        fse.readdir(filesPath)
            .then((files) => console.log('getFileNames:end', files) || files),

    readFile = (filePath, fileName) =>
        console.log('readFile:start', filePath, fileName) ||
        fse.readFile(path.join(filePath, fileName), 'utf8')
            .then((file) => console.log('readFile:end', file) || file)
            .then((content) => ({
                name: fileName,
                content
            })),

    readFiles = (filesPath, fileNames) =>
        Promise.all(
            fileNames.map((fileName) => readFile(filesPath, fileName))
        )
            .then((files) => {
                const filesMap = {};

                files.forEach((file) => {
                    filesMap[file.name] = file;
                });

                return filesMap;
            }),

    readFilesFromDir = (filesPath) =>
        console.log('getFileNames:start', filesPath) ||
        getFileNames(filesPath)
            .then(filterOutBlacklisted)
            .then((fileNames) => readFiles(filesPath, fileNames));

module.exports = {
    getFileNames,
    readFilesFromDir,
    readFile,
    readFiles
};

const
    nodegit = require('nodegit'),
    path = require('path'),
    promisify = require('promisify-node'),
    fse = promisify(require('fs-extra')),

    createFile = require('./create-file'),
    createFolder = require('./create-folder'),

    fileName = 'README.md',
    fileContent = '### something i guess',
    repoDir = 'flaff/views/create-repo-test',

    asyncEnsureDir = promisify(fse.ensureDir);

let repository,
    index,
    remote;

const
    flaffUser = {
        name: 'flaff',
        email: 'flaffy90@gmail.com'
    },

    userToSignature = (user) =>
        nodegit.Signature.create(
            user.name,
            user.email,
            Number(new Date()),
            90
        ),

    addInitialCommit = (repository, user) => (oid) =>
        repository.createCommit('HEAD',
            /* author */ userToSignature(user),
            /* committer */ userToSignature(user),
            /* commit name */ 'created', oid, [])
            .then(() => repository.getHeadCommit())
            .then((commit) => commit.sha()),

    addRemote = (repository, remoteAddress) =>
        nodegit.Remote.create(repository, 'origin', remoteAddress),

    addFiles = (files, index) =>
        Promise.all(files.map(file => index.addByPath(file)))
    ,

    addChanges = (index) =>
        index.write().then(() => index.writeTree())
    ,

    pushChanges = (remote) =>
        remote.push(['refs/heads/master:refs/heads/master'], {
            callbacks: {
                credentials: function (url, userName) {
                    console.log(url, userName);
                    return nodegit.Cred.sshKeyFromAgent(userName);
                }
            }
        })
;

// asyncEnsureDir( )
//     .then(() => nodegit.Repository.init(path.resolve(__dirname, repoDir), 0))
//     .then((repo) => {
//         repository = repo;
//         return fse.writeFile(path.join(repository.workdir(), fileName), fileContent);
//     })
//     .then(() => repository.refreshIndex())
//     .then((newIndex) => index = newIndex)
//     // add files
//     .then(() => addFiles([fileName]))
//     .then(() => addChanges(index))
//     .then((oid) => addInitialCommit(repository)(oid))
//     .then(() => addRemote(repository, 'http://flaff:flaff@localhost:7617/' + repoDir))
//     .then(() => pushChanges(remote));


module.exports = {
    userToSignature,
    addInitialCommit,
    addRemote,
    addFiles,
    addChanges,
    pushChanges
};

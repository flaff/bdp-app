const
    nodegit = require('nodegit'),
    path = require('path'),
    promisify = require('promisify-node'),
    fse = promisify(require('fs-extra')),

    createFile = require('./create-file'),
    createFolder = require('./create-folder'),

    fileName = 'README.md',
    fileContent = '### something i guess',
    repoDir = 'flaff/views/create-repo-test';

fse.ensureDir = promisify(fse.ensureDir);

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
            123456789,
            90
        ),

    addInitialCommit = (repository) => (oid) =>
        repository.createCommit('HEAD',
            /* author */ userToSignature(flaffUser),
            /* committer */ userToSignature(flaffUser),
            /* commit name */ 'created', oid, []),

    addRemote = (repository, remoteAddress) =>
        nodegit.Remote.create(repository, 'origin', remoteAddress)
            .then(remoteResult => {
                remote = remoteResult;
                return remote;
            }),

    addFiles = (files) =>
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

fse.ensureDir(path.resolve(__dirname, repoDir))
    .then(() => nodegit.Repository.init(path.resolve(__dirname, repoDir), 0))
    .then((repo) => {
        repository = repo;
        return fse.writeFile(path.join(repository.workdir(), fileName), fileContent);
    })
    .then(() => repository.refreshIndex())
    .then((newIndex) => index = newIndex)
    // add files
    .then(() => addFiles([fileName]))
    .then(() => addChanges(index))
    .then((oid) => addInitialCommit(repository)(oid))
    .then(() => addRemote(repository, 'http://flaff:flaff@localhost:7617/' + repoDir))
    .then(() => pushChanges(remote));

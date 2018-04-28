const
    NodeGit = require('nodegit'),
    path = require('path');

const
    getRepositoryAddress = (name, user) => 'localhost:7617',


    cloneRepository = (name) => {

    };

var localPath = require("path").join(__dirname, "repoTemp"),
    options = {
        certificateCheck: function () { return 1; }
    };

console.log('cloning', repositoryURL, localPath, options);
NodeGit.Clone(repositoryURL, localPath).then((repo) => {
    console.log(repo);
    console.log(repo.isBare());
    console.log('cloned');
})
    .catch(error => console.log('error', error));

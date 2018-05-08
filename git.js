const
    NodeGit = require('nodegit'),
    path = require('path');

const
    GIT_ADDR = 'localhost:7617',

    getRepositoryAddress = (user, type, name) => {
        return `${GIT_ADDR}/${user}/${type}/${name}`;
    },

    createNewRepository = (user, type, name) => {
        const repositoryURL = getRepositoryAddress(user, type, name);
    },

    cloneRepository = (user, type, name) => {

    };

var localPath = require('path').join(__dirname, 'repoTemp'),
    options = {
        certificateCheck: function () {
            return 1;
        }
    };

console.log('cloning', repositoryURL, localPath, options);
NodeGit.Clone(repositoryURL, localPath).then((repo) => {
    console.log(repo);
    console.log(repo.isBare());
    console.log('cloned');
})
    .catch(error => console.log('error', error));

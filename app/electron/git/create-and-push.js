const
    path = require('path'),
    nodegit = require('nodegit'),
    moment = require('moment'),

    {addChanges, addFiles, addInitialCommit, addRemote, pushChanges, userToSignature} = require('./utils/repository-utils'),
    createFolder = require('./utils/create-folder'),
    createFile = require('./utils/create-file');

// createRepoPayload = {
//     user: {
//         name: 'flaff',
//         email: 'flaff@email.com'
//     },
//     repository: {
//         address: 'http://localhost:7617',
//         name: 'flaff/some.view',
//         type: 'VIEW',
//         files: [
//             {
//                 name: 'README.md',
//                 content: '### markdown readme\n[google](http://google.pl)'
//             },
//             {
//                 name: 'view.py',
//                 content:
//                 '# created ' + moment().format('HH:mm DD.MM.YYYY') + '\n' +
//                 'import pandas as pd\nimport numpy as np'
//             }
//         ]
//     }
// };

const
    createAndPush = (dispatch) => (action) => {
        const
            createRepoPayload = action.payload,

            emit = (type, payload) => dispatch({
                source: createRepoPayload.repository.name,
                type: createRepoPayload.repository.type.toUpperCase() + '_' + type,
                payload
            }),

            emitProxy = (type, payload) => (value) =>
                emit(type, payload !== undefined ? payload : value) || value,

            emitProxyError = (type, payload) => (error) => {
                emit(type, payload || error && error.message || error);
                throw error;
            };


        let repository = null,
            index = null;

        emit('CREATE_FOLDER_START');
        return createFolder(path.resolve(__dirname, createRepoPayload.repository.name))
            .then(emitProxy('CREATE_FOLDER_SUCCESS'))
            // init repository
            .then(() => {
                emit('CREATE_REPOSITORY_START');
                return nodegit.Repository.init(path.resolve(__dirname, createRepoPayload.repository.name), 0)
            })
            .then(emitProxy('CREATE_REPOSITORY_SUCCESS'))

            .then((repo) => {
                repository = repo;

                emit('CREATE_FILES_START');
                // create files
                try {
                    Object.keys(createRepoPayload.repository.files)
                        .map(fileName => createRepoPayload.repository.files[fileName])
                        .forEach((file) => createFile(
                            path.join(repository.workdir(), file.name),
                            file.content
                        ));
                } catch (e) {
                    emitProxyError('CREATE_FILES_ERROR')(e);
                }
                emit('CREATE_FILES_SUCCESS');
            })
            .then(() => repository.refreshIndex())
            .then((i) => index = i)
            .then(() => {
                emit('ADD_FILES_START');
                return addFiles(Object.keys(createRepoPayload.repository.files), index)
                    .then(emitProxy('ADD_FILES_START'))
                    .catch(emitProxyError('ADD_FILES_ERROR'))
            })
            .then(() => {
                emit('ADD_CHANGES_START');
                return addChanges(index)
                    .then(emitProxy('ADD_CHANGES_SUCCESS'))
                    .catch(emitProxyError('ADD_CHANGES_ERROR'))
            })
            .then((oid) => {
                emit('COMMIT_START');
                return addInitialCommit(repository, createRepoPayload.user)(oid)
                    .then(emitProxy('COMMIT_SUCCESS'))
                    .catch(emitProxyError('COMMIT_ERROR'))
            })
            .then(() => {
                emit('ADD_REMOTE_START');
                return addRemote(repository,
                    createRepoPayload.repository.address.replace('http://', 'http://' + createRepoPayload.user.name + ':' + createRepoPayload.user.name + '@')
                    + '/' + createRepoPayload.repository.name)
                    .then(emitProxy('ADD_REMOTE_SUCCESS'))
                    .catch(emitProxyError('ADD_REMOTE_ERROR'))
            })
            .then((remote) => {
                emit('PUSH_CHANGES_START');
                return pushChanges(remote)
                    .then(emitProxy('PUSH_CHANGES_SUCCESS'))
                    .catch(emitProxyError('PUSH_CHANGES_ERROR'))
            })
            .catch((e) => emit('CREATE_AND_PUSH_ERROR', e));
    };

module.exports = createAndPush;

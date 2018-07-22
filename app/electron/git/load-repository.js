const
    path = require('path'),

    rf = require('./utils/read-files'),
    ut = require('../utils'),

    createEmit = ut.createEmit,
    createEmitProxy = ut.createEmitProxy,
    createEmitProxyError = ut.createEmitProxyError,

    readFile = rf.readFile,
    readFiles = rf.readFiles,
    readFilesFromDir = rf.readFilesFromDir,

    GIT_STORE_PATH = __dirname,

    getType = (name) => {
        const split = name.split('.');
        return split[split.length - 1];
    },

    loadProjectHandler = (dispatch) => (action) => {
        const
            emit = createEmit(dispatch),
            emitProxy = createEmitProxy(emit),
            emitProxyError = createEmitProxyError(emit);

        emit('LOAD_REPOSITORY.PROJECT_START');
        readFilesFromDir(path.join(GIT_STORE_PATH, action.payload.name))
            .then(emitProxy('LOAD_REPOSITORY.PROJECT_SUCCESS'))
            .catch(emitProxyError('LOAD_REPOSITORY.PROJECT_ERROR'));
    },

    loadVMVHandler = (dispatch) => (action) => {
        const
            emit = createEmit(dispatch),
            emitProxy = createEmitProxy(emit),
            emitProxyError = createEmitProxyError(emit),

            type = getType(action.payload.name);

        emit('LOAD_REPOSITORY.' + type.toUpperCase() + '_START');
        readFilesFromDir(path.join(GIT_STORE_PATH, action.payload.name))
            .then(emitProxy('LOAD_REPOSITORY.' + type.toUpperCase() + '_SUCCESS'))
            .catch(emitProxyError('LOAD_REPOSITORY.' + type.toUpperCase() + '_ERROR'));
    },

    loadRepositoryHandler = (dispatch) => (action) => {
        switch (action.type) {
            case 'LOAD_REPOSITORY.PROJECT_START':
                return loadProjectHandler(dispatch)(action);

            case 'LOAD_REPOSITORY.VIEW_START':
            case 'LOAD_REPOSITORY.MODEL_START':
            case 'LOAD_REPOSITORY.VISUALIZATION_START':
                return loadVMVHandler(dispatch)(action);
        }
    };

module.exports = loadRepositoryHandler;

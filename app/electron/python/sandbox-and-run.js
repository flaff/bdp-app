const
    path = require('path'),
    moment = require('moment'),
    Promise = require('bluebird'),
    PythonShell = require('python-shell'),

    createFolder = require('../git/utils/create-folder'),
    createFile = require('../git/utils/create-file'),

    {createEmit, createEmitProxy, createEmitProxyError} = require('../utils'),

    pythonRunFileAsync = (sandboxPath, fileName) => {
        return new Promise((resolve, reject) => {
            PythonShell.run(fileName, {
                mode: 'text',
                pythonOptions: ['-u'],
                scriptPath: sandboxPath
            }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        });
    };

/*{
    view: string,
    model: string,
    visualization: string
}*/

const
    sandboxAndRun = (dispatch) => (action) => {
        const
            sandboxPath = path.resolve(__dirname, 'sandbox'),

            {view, model, visualization} = action.payload,
            emit = createEmit(dispatch),
            emitProxy = createEmitProxy(emit),
            emitProxyError = createEmitProxyError(emit);

        emit('SANDBOX_AND_RUN_START');
        emit('SANDBOX_AND_RUN.CREATE_FOLDER_START');
        createFolder(sandboxPath)
            .then(emitProxy('SANDBOX_AND_RUN.CREATE_FOLDER_SUCCESS'))
            .catch(emitProxyError('SANDBOX_AND_RUN.CREATE_FOLDER_ERROR'))

            .then(() => {
                emit('SANDBOX_AND_RUN.CREATE_FILES_START');
                return Promise.all([
                    createFile(path.resolve(sandboxPath, 'view.py'), view),
                    createFile(path.resolve(sandboxPath, 'model.py'), model),
                    createFile(path.resolve(sandboxPath, 'visualization.py'), visualization)
                ])
                    .then(emitProxy('SANDBOX_AND_RUN.CREATE_FILES_SUCCESS'))
                    .catch(emitProxyError('SANDBOX_AND_RUN.CREATE_FILES_ERROR'))
            })
            .then(() => {
                emit('SANDBOX_AND_RUN.RUN_PYTHON_START');
                return pythonRunFileAsync(sandboxPath, 'view.py')
                    .then(emitProxy('SANDBOX_AND_RUN.RUN_PYTHON_SUCCESS'))
                    .catch(emitProxyError('SANDBOX_AND_RUN.RUN_PYTHON_ERROR'));
            })
            .then(emitProxy('SANDBOX_AND_RUN_SUCCESS'))
            .catch((e) => emit('SANDBOX_AND_RUN_ERROR', e));
    };

module.exports = sandboxAndRun;

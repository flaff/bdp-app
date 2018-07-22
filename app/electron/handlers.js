const {ipcMain} = require('electron');

const
    createAndPush = require('./git/create-and-push'),
    sandboxAndRun = require('./python/sandbox-and-run'),
    loadRepository = require('./git/load-repository');

const createDispatch = (event) =>
    (action) => {
        console.log('[DISPATCH]', action);
        event.sender.send('ACTION', action);
    };

ipcMain.on('ACTION', (event, action) => {
    console.log('[ACTION]', action.type, action);
    const dispatch = createDispatch(event);

    switch (action.type) {
        case 'CREATE_AND_PUSH_REPOSITORY':
            return createAndPush(dispatch)(action);

        case 'SANDBOX_AND_RUN':
            return sandboxAndRun(dispatch)(action);

        case 'TEST':
            console.log(action);
            return dispatch({type: 'TEST', payload: 'electron here, ' + action.payload})

        case 'LOAD_REPOSITORY.PROJECT_START':
        case 'LOAD_REPOSITORY.VIEW_START':
        case 'LOAD_REPOSITORY.MODEL_START':
        case 'LOAD_REPOSITORY.VISUALIZATION_START':
            return loadRepository(dispatch)(action);
    }
});
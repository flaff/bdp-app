const {ipcMain} = require('electron');

const createAndPush = require('./git/create-and-push');

const createDispatch = (event) =>
    (action) => {
        console.log(action);
        event.sender.send('ACTION', action);
    };

ipcMain.on('ACTION', (event, action) => {
    const dispatch = createDispatch(event);

    switch (action.type) {
        case 'CREATE_AND_PUSH_REPOSITORY':
            return createAndPush(dispatch)(action);

        case 'TEST':
            console.log(action);
            return dispatch({type: 'TEST', payload: 'electron here, ' + action.payload})
    }
});
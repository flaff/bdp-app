const {ipcMain} = require('electron');

const createAndPush = require('./git/create-and-push');

const createDispatch = (event) =>
    (type, payload) => {
        console.log(type, payload);
        event.sender.send('ACTION', {type, payload})
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
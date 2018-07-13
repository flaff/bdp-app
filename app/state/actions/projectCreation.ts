import {ipcRenderer} from 'electron';
import {CreateAndPushRepositoryPayload, RepositoryType} from '@state/types/projectCreation';
import {createRequestActions, createAction, IAction} from '@state/actions/helpers';

const
    dispatch = (action: IAction<any>) => ipcRenderer.send('ACTION', action),

    createActionsForCreateAndPushToRepository = (type: RepositoryType) => ({
        CREATE_FOLDER: createRequestActions(`${type}_CREATE_FOLDER`),
        CREATE_REPOSITORY: createRequestActions(`${type}_CREATE_REPOSITORY`),
        CREATE_FILES: createRequestActions(`${type}_CREATE_FILES`),
        ADD_FILES: createRequestActions(`${type}_ADD_FILES`),
        ADD_CHANGES: createRequestActions(`${type}_ADD_CHANGES`),
        COMMIT: createRequestActions(`${type}_COMMIT`),
        ADD_REMOTE: createRequestActions(`${type}_ADD_REMOTE`),
        PUSH_CHANGES: createRequestActions(`${type}_PUSH_CHANGES`),
        CREATE_AND_PUSH: createRequestActions(`${type}_CREATE_AND_PUSH`)
    });

export const
    CREATE_AND_PUSH_REPOSITORY = createAction<CreateAndPushRepositoryPayload>('CREATE_AND_PUSH_REPOSITORY'),

    PROJECT = createActionsForCreateAndPushToRepository('PROJECT'),
    VIEW = createActionsForCreateAndPushToRepository('VIEW'),
    MODEL = createActionsForCreateAndPushToRepository('MODEL'),
    VISUALIZATION = createActionsForCreateAndPushToRepository('VISUALIZATION'),

    createAndPushRepository = (payload: CreateAndPushRepositoryPayload) =>
        dispatch(CREATE_AND_PUSH_REPOSITORY(payload));
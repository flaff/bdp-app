import {ipcRenderer} from 'electron';
import {createRequestActions, createAction, IAction} from '@state/actions/helpers';
import {ModifyFilePayload} from '@state/types/projectEdition';

const
    dispatch = (action: IAction<any>) => ipcRenderer.send('ACTION', action);

export const
    MODIFY_VIEW_FILE = createAction<ModifyFilePayload>('MODIFY_VIEW_FILE'),
    MODIFY_MODEL_FILE = createAction<ModifyFilePayload>('MODIFY_MODEL_FILE'),
    MODIFY_VISUALIZATION_FILE = createAction<ModifyFilePayload>('MODIFY_VISUALIZATION_FILE'),

    modifyViewFile = (dispatch) => (p: ModifyFilePayload) => dispatch(MODIFY_VIEW_FILE(p)),
    modifyModelFile = (dispatch) => (p: ModifyFilePayload) => dispatch(MODIFY_MODEL_FILE(p)),
    modifyVisualizationFile = (dispatch) => (p: ModifyFilePayload) => dispatch(MODIFY_VISUALIZATION_FILE(p));

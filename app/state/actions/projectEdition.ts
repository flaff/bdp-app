import {ipcRenderer} from 'electron';
import {createRequestActions, createAction, IAction} from '@state/actions/helpers';
import {LoadRepositoryPayload, ModifyFilePayload, RunnableProject, LoadProjectRepositorySuccessPayload} from '@state/types/projectEdition';
import {RepositoryDf} from '@state/types/projectCreation';

const
    electronDispatch = (action: IAction<any>) => ipcRenderer.send('ACTION', action) && null;

export const
    MODIFY_VIEW_FILE = createAction<ModifyFilePayload>('MODIFY_VIEW_FILE'),
    MODIFY_MODEL_FILE = createAction<ModifyFilePayload>('MODIFY_MODEL_FILE'),
    MODIFY_VISUALIZATION_FILE = createAction<ModifyFilePayload>('MODIFY_VISUALIZATION_FILE'),

    SANDBOX_AND_RUN = {
        REQUEST: createAction<RunnableProject>('SANDBOX_AND_RUN'),
        START: createAction('SANDBOX_AND_RUN_START'),
        SUCCESS: createAction<Array<string>>('SANDBOX_AND_RUN_SUCCESS'),
        ERROR: createAction('SANDBOX_AND_RUN_ERROR'),
        CREATE_FOLDER: createRequestActions('SANDBOX_AND_RUN.CREATE_FOLDER'),
        CREATE_FILES: createRequestActions('SANDBOX_AND_RUN.CREATE_FILES'),
        RUN_PYTHON: createRequestActions('SANDBOX_AND_RUN.RUN_PYTHON'),
    },

    LOAD_REPOSITORY = {
        PROJECT: createRequestActions<LoadProjectRepositorySuccessPayload>('LOAD_REPOSITORY.PROJECT'),
        VIEW: createRequestActions<RepositoryDf>('LOAD_REPOSITORY.VIEW'),
        MODEL: createRequestActions<RepositoryDf>('LOAD_REPOSITORY.MODEL'),
        VISUALIZATION: createRequestActions<RepositoryDf>('LOAD_REPOSITORY.VISUALIZATION')
    },

    modifyViewFile = (dispatch) => (p: ModifyFilePayload) => dispatch(MODIFY_VIEW_FILE(p)),
    modifyModelFile = (dispatch) => (p: ModifyFilePayload) => dispatch(MODIFY_MODEL_FILE(p)),
    modifyVisualizationFile = (dispatch) => (p: ModifyFilePayload) => dispatch(MODIFY_VISUALIZATION_FILE(p)),

    sandboxAndRun = (dispatch) => (p: RunnableProject) => electronDispatch(SANDBOX_AND_RUN.REQUEST(p)),

    loadProjectRepository = (dispatch) => (p: LoadRepositoryPayload) =>
        electronDispatch(LOAD_REPOSITORY.PROJECT.START(p as any)),

    loadViewRepository = (dispatch) => (p: LoadRepositoryPayload) =>
        electronDispatch(LOAD_REPOSITORY.VIEW.START(p as any)),

    loadModelRepository = (dispatch) => (p: LoadRepositoryPayload) =>
        electronDispatch(LOAD_REPOSITORY.MODEL.START(p as any)),

    loadVisualizationRepository = (dispatch) => (p: LoadRepositoryPayload) =>
        electronDispatch(LOAD_REPOSITORY.VISUALIZATION.START(p as any));




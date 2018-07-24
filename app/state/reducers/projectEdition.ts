import {IAction} from '@state/actions';
import {
    LOAD_REPOSITORY,
    MODIFY_MODEL_FILE,
    MODIFY_VIEW_FILE,
    MODIFY_VISUALIZATION_FILE,
    SANDBOX_AND_RUN
} from '@state/actions/projectEdition';
import {
    RepositoryDf,
    RepositoryFileDf,
    RepositoryFilesDf,
    RepositoryType,
    StepTimeline
} from '@state/types/projectCreation';

import {EditedProject, LoadProjectRepositorySuccessPayload, ModifyFilePayload} from '@state/types/projectEdition';

export type ProjectEditionState = {
    currentTab: string;
    project: EditedProject;
    running: boolean;
    results: string;
    errorMessage: string;
    error: boolean;
};

const
    generateInitial = (type: RepositoryType): RepositoryDf => ({
        name: '',
        type: type,
        address: 'http://localhost:7617',
        author: '',
        files: {
            ['README.md']: {
                name: 'README.md',
                content: ''
            },
            [`${type.toLowerCase()}.py`]: {
                name: `${type.toLowerCase()}.py`,
                content: ''
            },
            ['short_desc.txt']: {
                name: 'short_desc.txt',
                content: ''
            },
        }
    }),

    cloneFiles = (files: RepositoryFilesDf) => {
        const newFiles: RepositoryFilesDf = {};

        Object.keys(files).forEach((fileName) => {
            newFiles[fileName] = {...files[fileName]};
        });

        return newFiles;
    },

    cloneHeadToCurrent = (head: RepositoryDf): RepositoryDf => ({
        ...head,
        files: cloneFiles(head.files)
    }),

    defaultState: ProjectEditionState = {
        currentTab: '',
        project: {
            fetching: false,
            fetched: false,
            files: {},

            model: {
                head: generateInitial('MODEL'),
                current: generateInitial('MODEL'),
                fetched: false,
                fetching: false
            },
            view: {
                head: generateInitial('VIEW'),
                current: generateInitial('VIEW'),
                fetched: false,
                fetching: false
            },
            visualization: {
                head: generateInitial('VISUALIZATION'),
                current: generateInitial('VISUALIZATION'),
                fetched: false,
                fetching: false
            },
        },
        results: '',
        running: false,
        error: false,
        errorMessage: ''
    };

const
    modifyFileReducer = (repository: RepositoryDf, action: IAction<ModifyFilePayload>): RepositoryDf => ({
        ...repository,
        files: {
            ...repository.files,
            [action.payload.name]: {
                name: action.payload.name,
                content: action.payload.content
            }
        }
    }),

    modifyViewFileReducer = (state: ProjectEditionState, action: IAction<ModifyFilePayload>): ProjectEditionState => ({
        ...state,
        project: {
            ...state.project,
            view: {
                ...state.project.view,
                current: modifyFileReducer(state.project.view.current, action)
            }
        }
    }),

    modifyModelFileReducer = (state: ProjectEditionState, action: IAction<ModifyFilePayload>): ProjectEditionState => ({
        ...state,
        project: {
            ...state.project,
            model: {
                ...state.project.model,
                current: modifyFileReducer(state.project.model.current, action)
            }
        }
    }),

    modifyVisualizationFileReducer = (state: ProjectEditionState, action: IAction<ModifyFilePayload>): ProjectEditionState => ({
        ...state,
        project: {
            ...state.project,
            visualization: {
                ...state.project.visualization,
                current: modifyFileReducer(state.project.visualization.current, action)
            }
        }
    }),

    sandboxAndRunStartReducer = (state: ProjectEditionState, action): ProjectEditionState => ({
        ...state,
        error: false,
        errorMessage: '',
        results: '',
        running: true
    }),

    sandboxAndRunSuccessReducer = (state: ProjectEditionState, action): ProjectEditionState => ({
        ...state,
        error: false,
        errorMessage: '',
        results: action.payload && action.payload.join('\n'),
        running: false
    }),

    sandboxAndRunErrorReducer = (state: ProjectEditionState, action): ProjectEditionState => ({
        ...state,
        errorMessage: (action.payload && action.payload.traceback && state.errorMessage.indexOf(action.payload.traceback) === -1)
            ? (state.errorMessage + '\n\n' + action.payload.traceback)
            : state.errorMessage,
        error: true,
        running: false
    }),



    sandboxAndRunPythonErrorReducer = (state: ProjectEditionState, action): ProjectEditionState => ({
        ...state,
        errorMessage: action.payload,
        error: true,
        running: false
    }),

    loadRepositoryReducer = (repo: RepositoryDf, action: IAction<RepositoryFilesDf>): RepositoryDf => ({
        ...repo,
        files: cloneFiles(action.payload)
    }),

    loadViewStartReducer = (state: ProjectEditionState, action): ProjectEditionState => ({
        ...state,
        project: {
            ...state.project,
            view: {
                ...state.project.view,
                fetched: false,
                fetching: true
            }
        }
    }),

    loadModelStartReducer = (state: ProjectEditionState, action): ProjectEditionState => ({
        ...state,
        project: {
            ...state.project,
            model: {
                ...state.project.model,
                fetched: false,
                fetching: true
            }
        }
    }),

    loadVisualizationStartReducer = (state: ProjectEditionState, action): ProjectEditionState => ({
        ...state,
        project: {
            ...state.project,
            visualization: {
                ...state.project.visualization,
                fetched: false,
                fetching: true
            }
        }
    }),

    loadViewSuccessReducer = (state: ProjectEditionState, action): ProjectEditionState => ({
        ...state,
        project: {
            ...state.project,
            view: {
                fetched: true,
                fetching: false,
                current: loadRepositoryReducer(state.project.view.current, action),
                head: loadRepositoryReducer(state.project.view.head, action)
            }
        }
    }),

    loadModelSuccessReducer = (state: ProjectEditionState, action): ProjectEditionState => ({
        ...state,
        project: {
            ...state.project,
            model: {
                fetched: true,
                fetching: false,
                current: loadRepositoryReducer(state.project.model.current, action),
                head: loadRepositoryReducer(state.project.model.head, action)
            }
        }
    }),

    loadVisualizationSuccessReducer = (state: ProjectEditionState, action): ProjectEditionState => ({
        ...state,
        project: {
            ...state.project,
            visualization: {
                fetched: true,
                fetching: false,
                current: loadRepositoryReducer(state.project.visualization.current, action),
                head: loadRepositoryReducer(state.project.visualization.head, action)
            }
        }
    }),

    loadProjectStartReducer = (state: ProjectEditionState, action): ProjectEditionState => ({
        ...state,
        project: {
            ...state.project,
            fetched: false,
            fetching: true
        }
    }),

    loadProjectSuccessReducer = (state: ProjectEditionState, action: IAction<RepositoryFilesDf>): ProjectEditionState => {
        const {viewName, modelName, visualizationName} = JSON.parse(action.payload['project.json'].content);

        return {
            ...state,
            project: {
                ...state.project,
                view: {
                    ...state.project.view,
                    current: {...state.project.view.current, name: viewName},
                    head: {...state.project.view.head, name: viewName}
                },
                model: {
                    ...state.project.model,
                    current: {...state.project.model.current, name: modelName},
                    head: {...state.project.model.head, name: modelName}
                },
                visualization: {
                    ...state.project.visualization,
                    current: {...state.project.visualization.current, name: visualizationName},
                    head: {...state.project.visualization.head, name: visualizationName}
                }
            }
        };
    };

    export default function projectEditionReducer(state: ProjectEditionState, action: IAction<any>) {
    switch (action.type) {
        case MODIFY_VIEW_FILE.type:
            return modifyViewFileReducer(state, action);

        case MODIFY_MODEL_FILE.type:
            return modifyModelFileReducer(state, action);

        case MODIFY_VISUALIZATION_FILE.type:
            return modifyVisualizationFileReducer(state, action);


        case SANDBOX_AND_RUN.START.type:
            return sandboxAndRunStartReducer(state, action);

        case SANDBOX_AND_RUN.SUCCESS.type:
            return sandboxAndRunSuccessReducer(state, action);

        case SANDBOX_AND_RUN.ERROR.type:
            return sandboxAndRunErrorReducer(state, action);

        case SANDBOX_AND_RUN.RUN_PYTHON.ERROR.type:
            return sandboxAndRunPythonErrorReducer(state, action);


        case LOAD_REPOSITORY.PROJECT.START.type:
            return loadProjectStartReducer(state, action);

        case LOAD_REPOSITORY.VIEW.START.type:
            return loadViewStartReducer(state, action);

        case LOAD_REPOSITORY.MODEL.START.type:
            return loadModelStartReducer(state, action);

        case LOAD_REPOSITORY.VISUALIZATION.START.type:
            return loadVisualizationStartReducer(state, action);


        case LOAD_REPOSITORY.PROJECT.SUCCESS.type:
            return loadProjectSuccessReducer(state, action);

        case LOAD_REPOSITORY.VIEW.SUCCESS.type:
            return loadViewSuccessReducer(state, action);

        case LOAD_REPOSITORY.MODEL.SUCCESS.type:
            return loadModelSuccessReducer(state, action);

        case LOAD_REPOSITORY.VISUALIZATION.SUCCESS.type:
            return loadVisualizationSuccessReducer(state, action);

        default:
            return state || defaultState;
    }
}

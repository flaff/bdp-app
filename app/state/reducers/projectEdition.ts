import {IAction} from '@state/actions';
import {
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

import {EditedProject, ModifyFilePayload} from '@state/types/projectEdition';

export type ProjectEditionState = {
    currentTab: string;
    fetching: boolean;
    project: EditedProject;
    running: boolean;
    results: string;
    error?: string;
};

const
    generateInitial = (type: RepositoryType) => ({
        name: `Fetching ${type.toLowerCase()}...`,
        type: type,
        address: 'http://localhost:7617',
        files: {
            ['README.md']: {
                name: 'README.md',
                content: ''
            },
            [`${type.toLowerCase()}.py`]: {
                name: `${type.toLowerCase()}.py`,
                content: ''
            },
            ['short-desc.txt']: {
                name: 'short-desc.txt',
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
        fetching: true,
        project: {
            model: {
                head: generateInitial('MODEL'),
                current: generateInitial('MODEL'),
            },
            view: {
                head: generateInitial('VIEW'),
                current: generateInitial('VIEW'),
            },
            visualization: {
                head: generateInitial('VISUALIZATION'),
                current: generateInitial('VISUALIZATION'),
            },
        },
        results: '',
        running: false
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
        error: '',
        results: '',
        running: true
    }),

    sandboxAndRunSuccessReducer = (state: ProjectEditionState, action): ProjectEditionState => ({
        ...state,
        error: '',
        results: action.payload && action.payload.join('\n'),
        running: false
    }),

    sandboxAndRunErrorReducer = (state: ProjectEditionState, action): ProjectEditionState => ({
        ...state,
        error: action.payload && action.payload.traceback,
        running: false
    });

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

        default:
            return state || defaultState;
    }
}

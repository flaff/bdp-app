import {IAction} from '@state/actions';
import {PROJECT, VIEW, MODEL, VISUALIZATION} from '@state/actions/projectCreation';
import {StepTimeline} from '@state/types/projectCreation';

export type ProjectCreationState = {
    projectTimeline: StepTimeline;
    viewTimeline: StepTimeline;
    modelTimeline: StepTimeline;
    visualizationTimeline: StepTimeline;
};

const
    defaultState: ProjectCreationState = {
        projectTimeline: {
            finishedSteps: []
        },
        viewTimeline: {
            finishedSteps: []
        },
        modelTimeline: {
            finishedSteps: []
        },
        visualizationTimeline: {
            finishedSteps: []
        }
    },

    /** removes repository type (view/model..) and action request type (success/error..) */
    getPureType = (type: string) => {
        const array = type.split('_');
        array.shift();
        array.pop();
        return array.join('_');
    },

    actionToMessage = {
        [getPureType(VIEW.CREATE_FOLDER.SUCCESS.type)]: 'Create older',
        [getPureType(VIEW.CREATE_REPOSITORY.SUCCESS.type)]: 'Create repository',
        [getPureType(VIEW.CREATE_FILES.SUCCESS.type)]: 'Create files',
        [getPureType(VIEW.ADD_FILES.SUCCESS.type)]: 'Add files',
        [getPureType(VIEW.ADD_CHANGES.SUCCESS.type)]: 'Add changes',
        [getPureType(VIEW.COMMIT.SUCCESS.type)]: 'Commit',
        [getPureType(VIEW.ADD_REMOTE.SUCCESS.type)]: 'Add remote',
        [getPureType(VIEW.PUSH_CHANGES.SUCCESS.type)]: 'Push'
    },

    isAType = (action: IAction<any>, actionProgressType: 'SUCCESS' | 'ERROR' | 'START') =>
        action.type.endsWith(actionProgressType),

    timelineStartReducer = (timeline: StepTimeline, action: IAction<void>): StepTimeline => ({
        ...timeline,
        pendingStep: actionToMessage[getPureType(action.type)]
    }),

    timelineSuccessReducer = (timeline: StepTimeline, action: IAction<void>): StepTimeline => ({
        ...timeline,
        pendingStep: '',
        finishedSteps: [
            ...timeline.finishedSteps,
            actionToMessage[getPureType(action.type)]
        ]
    }),

    timelineErrorReducer = (timeline: StepTimeline, action: IAction<void>): StepTimeline => ({
        ...timeline,
        pendingStep: '',
        failedStep: actionToMessage[getPureType(action.type)]
    }),

    timelineReducer = (timeline: StepTimeline, action: IAction<any>): StepTimeline => {
        if (isAType(action, 'SUCCESS')) {
            return timelineSuccessReducer(timeline, action);
        } else if (isAType(action, 'START')) {
            return timelineStartReducer(timeline, action);
        } else {
            return timelineErrorReducer(timeline, action);
        }
    },

    projectProjectCreationReducer = (state: ProjectCreationState, action: IAction<any>): ProjectCreationState => ({
        ...state,
        projectTimeline: timelineReducer(state.projectTimeline, action)
    }),

    viewProjectCreationReducer = (state: ProjectCreationState, action: IAction<any>): ProjectCreationState => ({
        ...state,
        viewTimeline: timelineReducer(state.viewTimeline, action)
    }),

    modelProjectCreationReducer = (state: ProjectCreationState, action: IAction<any>): ProjectCreationState => ({
        ...state,
        modelTimeline: timelineReducer(state.modelTimeline, action)
    }),

    visualizationProjectCreationReducer = (state: ProjectCreationState, action: IAction<any>): ProjectCreationState => ({
        ...state,
        visualizationTimeline: timelineReducer(state.visualizationTimeline, action)
    });


export default function projectCreationReducer(state: ProjectCreationState, action: IAction<any>) {
    switch (action.type.replace('_START', '').replace('_SUCCESS', '').replace('_ERROR', '')) {
        case PROJECT.CREATE_FOLDER.type:
        case PROJECT.CREATE_REPOSITORY.type:
        case PROJECT.CREATE_FILES.type:
        case PROJECT.ADD_FILES.type:
        case PROJECT.ADD_CHANGES.type:
        case PROJECT.COMMIT.type:
        case PROJECT.ADD_REMOTE.type:
        case PROJECT.PUSH_CHANGES.type:
            return projectProjectCreationReducer(state, action);

        case VIEW.CREATE_FOLDER.type:
        case VIEW.CREATE_REPOSITORY.type:
        case VIEW.CREATE_FILES.type:
        case VIEW.ADD_FILES.type:
        case VIEW.ADD_CHANGES.type:
        case VIEW.COMMIT.type:
        case VIEW.ADD_REMOTE.type:
        case VIEW.PUSH_CHANGES.type:
            return viewProjectCreationReducer(state, action);

        case MODEL.CREATE_FOLDER.type:
        case MODEL.CREATE_REPOSITORY.type:
        case MODEL.CREATE_FILES.type:
        case MODEL.ADD_FILES.type:
        case MODEL.ADD_CHANGES.type:
        case MODEL.COMMIT.type:
        case MODEL.ADD_REMOTE.type:
        case MODEL.PUSH_CHANGES.type:
            return modelProjectCreationReducer(state, action);

        case VISUALIZATION.CREATE_FOLDER.type:
        case VISUALIZATION.CREATE_REPOSITORY.type:
        case VISUALIZATION.CREATE_FILES.type:
        case VISUALIZATION.ADD_FILES.type:
        case VISUALIZATION.ADD_CHANGES.type:
        case VISUALIZATION.COMMIT.type:
        case VISUALIZATION.ADD_REMOTE.type:
        case VISUALIZATION.PUSH_CHANGES.type:
            return visualizationProjectCreationReducer(state, action);


        default:
            return state || defaultState;
    }
}
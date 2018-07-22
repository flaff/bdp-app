import {RepositoryFileDf, RepositoryDf} from './projectCreation';
import {RepositoryFilesDf} from '@state/types/projectCreation';

export type RunnableProject = {
    view: string;
    model: string;
    visualization: string;
};

export type LoadRepositoryPayload = {
    name: string;
};

export type LoadProjectRepositorySuccessPayload = {
    viewName: string;
    modelName: string;
    visualizationName: string;
};

export type EditedProject = {
    fetching: boolean;
    fetched: boolean;
    files: RepositoryFilesDf;

    view: {
        fetched: boolean;
        fetching: boolean;
        head: RepositoryDf;
        current: RepositoryDf;
    };
    model: {
        fetched: boolean;
        fetching: boolean;
        head: RepositoryDf;
        current: RepositoryDf;
    };
    visualization: {
        fetched: boolean;
        fetching: boolean;
        head: RepositoryDf;
        current: RepositoryDf;
    };
};

export type ModifyFilePayload = {
    name: string;
    content: string;
};

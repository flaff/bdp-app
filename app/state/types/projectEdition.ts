import {RepositoryFileDf, RepositoryDf} from './projectCreation';

export type RunnableProject = {
    view: RepositoryFileDf;
    model: RepositoryFileDf;
    visualization: RepositoryFileDf;
};

export type EditedProject = {
    view: {
        head: RepositoryDf;
        current: RepositoryDf;
    };
    model: {
        head: RepositoryDf;
        current: RepositoryDf;
    };
    visualization: {
        head: RepositoryDf;
        current: RepositoryDf;
    };
};

export type ModifyFilePayload = {
    name: string;
    content: string;
};

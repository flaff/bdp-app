export type RepositoryType = 'PROJECT' | 'VIEW' | 'MODEL' | 'VISUALIZATION';
export type RepositoryFileDf = {
    name: string;
    content: string;
};

export type StepTimeline = {
    pendingStep?: string;
    failedStep?: string;
    finishedSteps: Array<string>;
};

export type CreateAndPushRepositoryPayload = {
    user: {
        name: string;
        email: string;
    };
    repository: {
        address: string;
        name: string;
        type: RepositoryType;
        files: Array<RepositoryFileDf>;
    }
};

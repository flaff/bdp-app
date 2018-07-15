export type RepositoryType = 'PROJECT' | 'VIEW' | 'MODEL' | 'VISUALIZATION';
export type RepositoryFileDf = {
    name: string;
    content: string;
};

export type StepTimelineItem = {
    title: string;
    secondary?: string;
};

export type StepTimeline = {
    pendingStep?: StepTimelineItem;
    failedStep?: StepTimelineItem;
    finishedSteps: Array<StepTimelineItem>;
};

export type RepositoryFilesDf = {[fileName: string]: RepositoryFileDf};

export type RepositoryDf = {
    address: string;
    name: string;
    type: RepositoryType;
    files: RepositoryFilesDf;
};

export type CreateAndPushRepositoryPayload = {
    user: {
        name: string;
        email: string;
    };
    repository: RepositoryDf;
};

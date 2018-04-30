const
    Mappings = {
        LIST_REPOSITORIES_URL: '/repositories',
        LIST_MODELS_URL: '/models',
        LIST_VIEWS_URL: '/views',
        LIST_PROJECTS_URL: '/projects',
        USER_HIGHLIGHT_URL: ({userName}) => `/user/${userName}/highlight`,
    };

export default Mappings;

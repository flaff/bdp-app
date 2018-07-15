import {combineReducers, Reducer} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import auth from './reducers/auth';
import projectCreation from '@state/reducers/projectCreation';
import projectEdition from '@state/reducers/projectEdition';


const rootReducer = combineReducers({
    projectCreation,
    auth,
    routing,
    projectEdition
});

export type StoreState = {
    projectCreation: ReturnType<typeof projectCreation>;
    auth: ReturnType<typeof auth>;
    routing: ReturnType<typeof routing>;
    projectEdition: ReturnType<typeof projectEdition>;
};

export default rootReducer;

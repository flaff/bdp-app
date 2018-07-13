import {combineReducers, Reducer} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import auth from './reducers/auth';
import projectCreation from '@state/reducers/projectCreation';


const rootReducer = combineReducers({
    projectCreation,
    auth,
    routing
});

export type StoreState = {
    projectCreation: ReturnType<typeof projectCreation>;
    auth: ReturnType<typeof auth>;
    routing: ReturnType<typeof routing>;
};

export default rootReducer;

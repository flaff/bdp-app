import {combineReducers, Reducer} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import auth from './reducers/auth';


const rootReducer = combineReducers({
    auth,
    routing
});

export type StoreState = {
    auth: ReturnType<typeof auth>;
    routing: ReturnType<typeof routing>;
};

export default rootReducer;

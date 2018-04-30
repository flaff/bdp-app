import {combineReducers, Reducer} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import counter, {TState as TCounterState} from './counter.reducer';
import user, {TUserState} from './user.reducer';

const rootReducer = combineReducers({
    counter,
    user,
    routing: routing as Reducer<any>
});

export interface IState {
    counter: TCounterState;
    user: TUserState;
}

export default rootReducer;

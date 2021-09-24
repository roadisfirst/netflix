import { combineReducers } from 'redux';

import authReducer from './auth';
import showsReducer from './shows';
import showReducer from './show';

const rootReducer = combineReducers({
    auth: authReducer,
    shows: showsReducer,
    show: showReducer,
})

export default rootReducer;
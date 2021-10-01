import { combineReducers } from 'redux';

import authReducer from './auth';
import showsReducer from './shows';
import showReducer from './show';
import userReducer from './user';
import usersReducer from './users';
import favoriteReducer from './favorite';

const rootReducer = combineReducers({
    auth: authReducer,
    shows: showsReducer,
    show: showReducer,
    user: userReducer,
    users: usersReducer,
    favorite: favoriteReducer,
})

export default rootReducer;
import { reducer as formReducer } from 'redux-form';

import { combineReducers } from 'redux';

import uploadReducer from './uploadReducer';
import errorReducer from './errorReducer';

const appReducer = combineReducers({
    upload: uploadReducer,
    error: errorReducer,
    form: formReducer
});

export default appReducer;
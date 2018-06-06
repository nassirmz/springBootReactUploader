import { RESET_ERROR, SET_ERROR } from '../constants/ActionTypes';

const errorState = {
    errorMessage: ''
};

export default function errorReducer(state = errorState, action) {
    switch (action.type) {
        case SET_ERROR:
            return { errorMessage: action.errorMessage };
        case RESET_ERROR:
            return { errorMessage: '' };
        default:
            return state;
    }
}
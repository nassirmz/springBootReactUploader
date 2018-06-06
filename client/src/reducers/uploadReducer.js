import { UPLOAD_SUCCESS, RESET_UPLOAD_DATA  } from '../constants/ActionTypes';

const uploadState = {
    name: '',
};

export default function uploadReducer(state = uploadState, action) {
    switch (action.type) {
        case UPLOAD_SUCCESS:
            return {
                name: action.name,
            };
        case RESET_UPLOAD_DATA:
            return {
                name: '',
            };
        default:
            return state;
    }
}
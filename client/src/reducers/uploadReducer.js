import { UPLOAD_SUCCESS  } from '../constants/ActionTypes';

const uploadState = {
    name: '',
    size: '',
};

export default function uploadReducer(state = uploadState, action) {
    switch (action.type) {
        case UPLOAD_SUCCESS:
            return {
                name: action.name,
                size: action.size
            };
        default:
            return state;
    }
}
import axios from 'axios';

import { UPLOAD_SUCCESS, RESET_UPLOAD_DATA, SET_ERROR, RESET_ERROR } from '../constants/ActionTypes';

export function authSuccess(data) {
    return {
        type: UPLOAD_SUCCESS,
        name: data.name,
    };
}

export function resetUploadData() {
    return {
        type: RESET_UPLOAD_DATA
    };
}

export function startUpload(uploadValue) {
    return (dispatch) => {
        const headers = { headers: { 'Content-Type': 'multipart/form-data' } };
        axios.post('http://localhost:8080/files', uploadValue, headers)
            .then((resp) => {
                console.log(resp, resp.data, 'success response');
                dispatch(authSuccess(resp.data));
                dispatch({ type: RESET_ERROR });
            })
            .catch((error) => {
                console.log(error, 'error');
                let errorMessage = error.response && error.response.data && error.response.data.message;
                dispatch({ type: SET_ERROR, errorMessage });
            });
    };
}

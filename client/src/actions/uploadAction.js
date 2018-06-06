import axios from 'axios';

import { UPLOAD_SUCCESS, SET_ERROR, RESET_ERROR } from '../constants/ActionTypes';

export function authSuccess(data) {
    return {
        type: UPLOAD_SUCCESS,
        name: data.name,
        size: data.size
    };
}

export function startUpload(uploadValue) {
    console.log('startUpload Value', uploadValue);
    return (dispatch) => {
        console.log('uploadValue inside dispatch', uploadValue);
        const headers = { headers: { 'Content-Type': 'multipart/form-data' } };
        axios.post('http://localhost:8080/files', uploadValue, headers)
            .then((resp) => {
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

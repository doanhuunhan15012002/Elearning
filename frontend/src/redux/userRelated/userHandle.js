import axios from 'axios';
import {
    authRequest,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
} from './userSlice';

// Helper: serialize Axios error
const formatError = (error) => ({
    message: error?.response?.data?.message || error.message || 'Unknown error',
    status: error?.response?.status || null,
    code: error.code || null,
});

// Login
export const loginUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/${role}Login`,
            fields,
            { headers: { 'Content-Type': 'application/json' } }
        );

        console.log("Login response:", result.data); // ✅ Thêm dòng này để kiểm tra

        if (result.data.role) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        dispatch(authError(formatError(error)));
    }
};


// Register
export const registerUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/${role}Reg`,
            fields,
            { headers: { 'Content-Type': 'application/json' } }
        );

        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
        } else if (result.data.school) {
            dispatch(stuffAdded(result.data));
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        dispatch(authError(formatError(error)));
    }
};

// Logout
export const logoutUser = () => (dispatch) => {
    dispatch(authLogout());
};

// Get user details
export const getUserDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(formatError(error)));
    }
};

// Delete user (disabled intentionally)
export const deleteUser = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    dispatch(getFailed("Sorry, the delete function has been disabled for now."));
};

// Update user
export const updateUser = (fields, id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(
            `${process.env.REACT_APP_BASE_URL}/${address}/${id}`,
            fields,
            { headers: { 'Content-Type': 'application/json' } }
        );

        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(formatError(error)));
    }
};

// Add generic item (e.g. quiz, stuff)
export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/${address}Create`,
            fields,
            { headers: { 'Content-Type': 'application/json' } }
        );

        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(stuffAdded(result.data));
        }
    } catch (error) {
        dispatch(authError(formatError(error)));
    }
};

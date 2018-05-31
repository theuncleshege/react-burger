import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    isAuthenticated: false,
    authRedirectPath: "/"
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false,
        isAuthenticated: true
    })
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
        error: null,
        loading: false,
        isAuthenticated: false
    })
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, {error: null, loading: true});
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return updateObject(state, {error: action.error, loading: false});
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return updateObject(state, {authRedirectPath: action.path});
        default:
            return state;
    }
};

export default reducer;
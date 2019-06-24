import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import axios from "axios";

import * as actions from "../actions";

export function* logoutSaga(action) {
    yield call([localStorage, "removeItem"], "token");
    yield call([localStorage, "removeItem"], "userId");
    yield call([localStorage, "removeItem"], "expirationTime");
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());

    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyABvLSjoqrPpTYvsVa-QNy8mpJ2e9voGME';

    if (!action.isSignUp) {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyABvLSjoqrPpTYvsVa-QNy8mpJ2e9voGME';
    }

    try {
        const response = yield axios.post(url, authData);
        const expirationTime = yield new Date(new Date().getTime() + (response.data.expiresIn * 1000));
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('userId', response.data.localId);
        localStorage.setItem('expirationTime', expirationTime);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    }
    catch (error) {
        console.log(error);
        yield put(actions.authFail(error.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    }
    else {
        const expirationTime = yield new Date(localStorage.getItem('expirationTime'));
        if (expirationTime > new Date()) {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout( (expirationTime.getTime() - new Date().getTime())/1000));
        }
        else {
            yield put(actions.logout());
        }
    }
}


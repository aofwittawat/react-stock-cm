import { LOGIN_FAILED, LOGIN_FETCHING, LOGIN_SUCCESS, LOGOUT } from "../Constants"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    result: null,
    isFetching: false,
    isError: false,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case LOGIN_FETCHING:
        return {...state, isFetching: true, isError: false, result: null}
    case LOGIN_FAILED:
        return {...state, isFetching: false, isError: true, result: payload}
    case LOGIN_SUCCESS:
        return {...state, isFetching: false, isError: false, result: payload}
    case LOGOUT:
        return initialState
    default:
        return state
    }
}

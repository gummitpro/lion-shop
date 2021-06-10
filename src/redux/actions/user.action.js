export function loginAction(params) {
    return {
        type: 'LOGIN_REQUEST',
        payload: params,
    }
}
export function getUserInfoAction(params) {
    return {
        type: 'GET_USER_INFO_REQUEST',
        payload: params,
    }
}
export function getUserListAction(){
    return {
        type: 'GET_USER_LIST_REQUEST'
    }
}
export function registerAction(params) {
    return {
        type: 'REGISTER_REQUEST',
        payload: params,
    }
}
export function logoutAction() {
    return {
        type: 'LOGOUT',
    }
}
export function editUserAction(params) {
    return {
        type: 'EDIT_USER_REQUEST',
        payload: params
    }
}
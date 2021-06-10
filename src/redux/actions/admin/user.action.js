export function getOrderAdminAction(params) {
  return {
    type: 'GET_ORDER_ADMIN_REQUEST',
    payload: params,
  }
}
export function getUserFilterAdminAction(params) {
  return {
    type: 'GET_USER_FILTER_REQUEST',
    payload: params,
  }
}
export function removeUserAction(params) {
  return {
      type: 'REMOVE_USER_REQUEST',
      payload: params
  }
}
export function changeStatusUserAdminAction(params) {

  return {
      type: 'CHANGE_STATUS_USER_REQUEST',
      payload: params
  }
}

export function editUserAdminAction(params) {
  return {
      type: 'EDIT_USER_REQUEST',
      payload: params
  }
}
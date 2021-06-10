export function getProductListAction(params) {
  return {
    type: 'GET_PRODUCT_LIST_REQUEST',
    payload: params,
  }
}

export function getProductDetailAction(params){
  return {
    type: 'GET_PRODUCT_DETAIL_REQUEST',
    payload: params
  }
}
export function getProductSameAction(params) {
  return {
    type: 'GET_PRODUCT_SAME_REQUEST',
    payload: params,
  }
}
export function addProductCartAction(params) {
  console.log("params cart: ", params)
  return {
    type: 'ADD_PRODUCT_CART_REQUEST',
    payload: params,
  }
}

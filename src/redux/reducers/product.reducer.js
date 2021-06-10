var localStorageCart = JSON.parse(localStorage.getItem("shoppingCart"));
var localStorageNumberCart = JSON.parse(localStorage.getItem("numberCart"));
const initialState = {
  productList: {
    data: [],
    load: false,
    error: '',
  },
  productDetail: {
    data: [],
    load: false,
    error: '',
  },
  productListSame: {
    data: [],
    load: false,
    error: '',
  },
  
  
  numberCart:localStorageNumberCart ? localStorageNumberCart : 0,
  shoppingCart: {
    data: localStorageCart ? localStorageCart : [],
    load: false,
    error: '',
  },
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_PRODUCT_LIST_REQUEST': {
      return {
        ...state,
        productList: {
          ...state.productList,
          load: true,
        },
      }
    }
    case 'GET_PRODUCT_LIST_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        productList: {
          ...state.productList,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_PRODUCT_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        productList: {
          ...state.productList,
          load: false,
          error: error,
        },
      }
    }
    case 'ADD_PRODUCT_ADMIN_REQUEST': {
      return {
        ...state,
        productList: {
          ...state.productList,
          load: true,
        }
      }
    }
    case 'ADD_PRODUCT_ADMIN_SUCCESS': {
      const { data } = action.payload
      return {
        ...state,
        productList: {
          ...state.productList,
          load: false,
          data: data
        }
      }
    }
    case 'ADD_PRODUCT_ADMIN_FAIL': {
      const { error } = action.payload
      return {
        ...state,
        productList: {
          ...state.productList,
          load: false,
          error: error
        }
      }
    }
    case 'EDIT_PRODUCT_ADMIN_REQUEST': {
      return {
        ...state,
        productList: {
          ...state.productList,
          load: true,
        }
      }
    }
    case 'EDIT_PRODUCT_ADMIN_SUCCESS': {
      const { id, name, price, categoryId, inventory } = action.payload
      const newProductList = state.productList.data;
      const productIndex = newProductList.findIndex((item) => { return item.id === id });
      newProductList.splice(productIndex, 1, {id: id, name: name, price: price, categoryId: categoryId,inventory: inventory})
      return {
        ...state,
        productList: {
          ...newProductList,
          load: false,
          data: newProductList
        }
      }
    }
    case 'EDIT_PRODUCT_ADMIN_FAIL': {
      const { error } = action.payload
      return {
        ...state,
        productList: {
          ...state.productList,
          load: false,
          error: error
        }
      }
    }
    case 'REMOVE_PRODUCT_ADMIN_REQUEST': {
      return {
        ...state,
        productList: {
          ...state.productList,
          load: true,
        }
      }
    }
    case 'REMOVE_PRODUCT_ADMIN_SUCCESS': {
      const { id } = action.payload
      const newProductList = state.productList.data;
      const productIndex = newProductList.findIndex((item) => { return item.id === id });
      newProductList.splice(productIndex, 1)
      return {
        ...state,
        productList: {
          ...newProductList,
          load: false,
          data: newProductList
        }
      }
    }
    case 'GET_PRODUCT_DETAIL_REQUEST': {
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          load: true,
        },
      }
    }
    case 'GET_PRODUCT_DETAIL_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_PRODUCT_DETAIL_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          load: false,
          error: error,
        },
      }
    }
    case 'GET_PRODUCT_SAME_REQUEST': {
      return {
        ...state,
        productListSame: {
          ...state.productListSame,
          load: true,
        },
      }
    }
    case 'GET_PRODUCT_SAME_SUCCESS': {
      const { data } = action.payload;
      // console.log("state product reducer : ", data)
      return {
        ...state,
        productListSame: {
          ...state.productListSame,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_PRODUCT_SAME_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        productListSame: {
          ...state.productListSame,
          load: false,
          error: error,
        },
      }
    }
    case 'ADD_PRODUCT_CART_REQUEST': {
      const { data } = action.payload;
      
      if(state.numberCart === 0){
        let cart = {
            id:action.payload.id,
            quantity:1,
            name:action.payload.name,
            image:action.payload.image,
            price:action.payload.price
          }
          state.shoppingCart.data.push(cart);
      }
      else{
          let check = false;
          state.shoppingCart.data.map((item,key)=>{
              if(item.id === action.payload.id){
                  state.shoppingCart.data[key].quantity++;
                  check=true;
              }
          });
          if(!check){
              let _cart = {
                  id:action.payload.id,
                  quantity:1,
                  name:action.payload.name,
                  image:action.payload.image,
                  price:action.payload.price
              }
              state.shoppingCart.data.push(_cart);
          }
          //
      }
      state.numberCart+=1
      localStorage.setItem("shoppingCart", JSON.stringify(state.shoppingCart.data))
      localStorage.setItem("numberCart", JSON.stringify(state.numberCart))
      return {
        ...state,
        numberCart:state.numberCart

      }
    }
    default: {
      return state;
    }
  }
}

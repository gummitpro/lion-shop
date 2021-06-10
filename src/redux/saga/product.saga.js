import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* getProductListSaga() {
  try {
    //const { page, limit } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3001/products'
    });
    yield put({
      type: "GET_PRODUCT_LIST_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "GET_PRODUCT_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3001/products/${id}`,
      params: {
        _embed: 'productOptions',
        // _expand: 'category'
      }
    });
    yield put({
      type: "GET_PRODUCT_DETAIL_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({type: "GET_PRODUCT_DETAIL_FAIL", message: e.message});
  }
}

function* getProductListSameSaga(action) {
  try {
    
    const { categoryId } = action.payload;
    console.log("categoryId saga: ", categoryId)
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3001/products?categoryId=${categoryId}`
    });
    // console.log("result list product: ", result)
    yield put({
      type: "GET_PRODUCT_SAME_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "GET_PRODUCT_SAME_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* addProductAdminSaga(action) {
   try {
    const { name, price, categoryId, inventory} = action.payload;
    const pos = yield axios.post('http://localhost:3001/products', {name, price, categoryId, inventory})
    const result = yield axios.get('http://localhost:3001/products')
    if (pos.data) {
      yield put({ // đợi rồi mới chạy
        type: "ADD_PRODUCT_ADMIN_SUCCESS",
        payload: {
          data: result.data,
        },
      });
      // yield alert("Thành công");
    } else {
      yield put({
        type: "ADD_PRODUCT_ADMIN_FAIL",
        payload: {
          error: 'FAIL',
        },
      });
    }
   } catch (e) {
    yield put({
      type: "ADD_PRODUCT_ADMIN_FAIL",
      payload: {
        error: e.error,
      },
    });
   }
}

function* editProductAdminSaga (action) {
  try {
    const {name,price,id,categoryId, inventory} = action.payload
    const result = yield axios.patch(`http://localhost:3001/products/${id}`, {name,price,categoryId,inventory})
    if(result.data){
      yield put({
        type: 'EDIT_PRODUCT_ADMIN_SUCCESS',
        payload: result.data
      })
    } else {
      yield put({
        type: 'EDIT_PRODUCT_ADMIN_FAIL',
        payload: {
          error: 'FAIL'
        }
      })
    }
    } catch(e) {
      yield put({
        type: 'EDIT_PRODUCT_ADMIN_FAIL',
        payload: {
          error :e.error
        }
      })
    }
}
function* removeProductAdminSaga(action){
  try {
    const { id } = action.payload
    const result = yield axios.delete(`http://localhost:3001/products/${id}`)
    if(result.data) {
        yield put({
          type: 'REMOVE_PRODUCT_ADMIN_SUCCESS',
          payload: { id }
    })
    } else {
      yield put ({
        type: 'REMOVE_PRODUCT_ADMIN_FAIL',
        payload: {
          error: 'FAIL'
        }
      })
    }
  } catch (e) {
    yield put ({
      type: 'REMOVE_PRODUCT_ADMIN_FAIL',
      payload: {
        error: e.error
      }
    })
  }
}

export default function* productSaga() {
  yield takeEvery('GET_PRODUCT_LIST_REQUEST', getProductListSaga);
  yield takeEvery('GET_PRODUCT_DETAIL_REQUEST', getProductDetailSaga);
  yield takeEvery('GET_PRODUCT_SAME_REQUEST', getProductListSameSaga);
  yield takeEvery('ADD_PRODUCT_ADMIN_REQUEST', addProductAdminSaga);
  yield takeEvery('EDIT_PRODUCT_ADMIN_REQUEST', editProductAdminSaga);
  yield takeEvery('REMOVE_PRODUCT_ADMIN_REQUEST',removeProductAdminSaga);
}

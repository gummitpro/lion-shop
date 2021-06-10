import { fork } from 'redux-saga/effects';

import userSaga from './user.saga';
import productSaga from './product.saga';
import adminProductSaga from './admin/product.saga';
import adminUserSaga from './admin/user.saga';
import orderAdminSaga from './admin/order.saga';

export default function* mySaga() {
  yield fork(userSaga);
  yield fork(productSaga);
  yield fork(adminProductSaga);
  yield fork(adminUserSaga);
  yield fork(orderAdminSaga);
}

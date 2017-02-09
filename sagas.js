import { delay } from 'redux-saga';
import { put, call, takeEvery } from 'redux-saga/effects';

// let's check that the Saga middleware is wired up correctly :)
export function* helloSaga() {
  console.log('Hello Sagas!')
}

// WORKER saga that performs the async increment task
export function* incrementAsync() {
  console.log('start delay')
  yield call(delay, 1000)
  console.log('end delay')
  yield put({ type: 'INCREMENT' })
}

// WATCHER saga that generates a new incrementAsync task on each INCREMENT_ASYNC action
export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

// single entry point to start ALL Sagas at once
export default function* rootSaga() {
  yield [
    helloSaga(),
    watchIncrementAsync()
  ]
}

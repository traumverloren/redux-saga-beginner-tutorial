import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleWare from 'redux-saga';

import { helloSaga } from './sagas';

import Counter from './Counter'
import reducer from './reducers'

const __REDUX_DEVTOOLS_EXTENSION__ = window.__REDUX_DEVTOOLS_EXTENSION__;

const sagaMiddleWare = createSagaMiddleWare();
const store = createStore(
  reducer,
  __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleWare)
)

sagaMiddleWare.run(helloSaga);

const action = type => store.dispatch({type})

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)

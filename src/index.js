import React from 'react'
import ReactDom from 'react-dom'
import configureStore from '@/stores'
// 主页面
import App from './App'
import ErrorBoundary from '@/components/ErrorBoundary'

const stores = configureStore()

ReactDom.render(
  <ErrorBoundary>
    <App stores={stores} />
  </ErrorBoundary>
  , document.getElementById('app'))
import React from 'react'
import { Provider } from 'react-redux'
import { history } from '@/stores'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/es/integration/react'
import { hot } from 'react-hot-loader'
import { Redirect, Switch } from 'react-router-dom'
import routes from '@/routes'
import RouteWithSubRoutes from '@/constants/RouteWithSubRoutes'
import '@/styles/index.less'

const onBeforeLift = () => {
  // console.log('before action')
}

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { persistor, store } = this.props.stores
    // 主页面
    return (
      <Provider store={store}>
        <PersistGate loading={<div />} onBeforeLift={onBeforeLift} persistor={persistor}>
          <ConnectedRouter history={history}>
            <Switch>
              {
                routes && routes.map((route, index) => (<RouteWithSubRoutes {...route} key={index} />))
              }
              <Redirect to="/" />
            </Switch>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    )
  }
}

export default hot(module)(App)

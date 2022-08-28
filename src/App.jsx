import React, { Suspense } from 'react'

import store from './store'
import { routes } from '@/router'

import OrderSearchProvider from '@/context/use-order-search'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { AppWrapper, MainWrapper } from './style'
import NavList from './components/nav-list'

export default function App() {
  return (
    <Provider store={store}>
      <OrderSearchProvider>
        <HashRouter>
          <AppWrapper>
            <NavList />
            <MainWrapper>
              <Suspense fallback={<div>page loading</div>}>
                {renderRoutes(routes)}
              </Suspense>
            </MainWrapper>
          </AppWrapper>
        </HashRouter>
      </OrderSearchProvider>
    </Provider>
  )
}

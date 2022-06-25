import Reac, { Suspense } from "react";

import { Provider } from "react-redux";
import store from "./store";
import { HashRouter, NavLink } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { routes } from '@/router'

export default function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          <div className="list"><NavLink to="/goods">go goods</NavLink></div>
          <div className="main">
            <Suspense fallback={<div>page loading</div>}>
              {renderRoutes(routes)}
            </Suspense>
          </div>
        </div>
      </HashRouter>
    </Provider>
  );
}


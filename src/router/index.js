import React from 'react'
import { Redirect } from 'react-router-dom'
// import Home from '@/pages/home'
// import Goods from '@/pages/goods'

const Home = React.lazy(_ => import('@/pages/home'))
const Goods = React.lazy(_ => import('@/pages/goods'))

export const routes = [
  {
    path: '/',
    exact: true,
    render: () => (<Redirect to="/home" />)
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/goods',
    component: Goods
  }
]
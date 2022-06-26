import React from 'react'
import { Redirect } from 'react-router-dom'
// import Home from '@/pages/home'
// import Goods from '@/pages/goods'

const Home = React.lazy(_ => import('@/pages/home'))
const Goods = React.lazy(_ => import('@/pages/goods'))
const Order = React.lazy(_ => import('@/pages/order'))
const Sorts = React.lazy(_ => import('@/pages/sorts'))

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
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/sorts',
    component: Sorts
  }
]
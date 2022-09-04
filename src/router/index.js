import React from 'react'
import { Redirect } from 'react-router-dom'

const Home = React.lazy(_ => import('@/pages/home'))
const Goods = React.lazy(_ => import('@/pages/goods'))
const Order = React.lazy(_ => import('@/pages/orders'))
const Sorts = React.lazy(_ => import('@/pages/sorts'))
const AddSort = React.lazy(_ => import('@/pages/sorts/c-pages/add-sort'))
const Colors = React.lazy(_ => import('@/pages/colors'))
const AddColor = React.lazy(_ => import('@/pages/colors/c-pages/add-color'))

export const routes = [
  {
    path: '/',
    exact: true,
    render: () => <Redirect to="/home" />
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/goods',
    exact: true,
    component: Goods
  },
  {
    path: '/orders',
    exact: true,
    component: Order
  },
  {
    path: '/sorts',
    exact: true,
    component: Sorts
  },
  {
    path: '/sorts/add',
    component: AddSort
  },
  {
    path: '/colors',
    exact: true,
    component: Colors
  },
  {
    path: '/colors/add',
    component: AddColor
  }
]

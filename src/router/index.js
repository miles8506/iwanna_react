import React from 'react'
import { Redirect } from 'react-router-dom'

const Home = React.lazy((_) => import('@/pages/home'))
const Goods = React.lazy((_) => import('@/pages/goods'))
const Order = React.lazy((_) => import('@/pages/order'))
const Sorts = React.lazy((_) => import('@/pages/sorts'))
const AddSort = React.lazy((_) => import('@/pages/sorts/c-cpns/add-sort'))

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
    component: Goods
  },
  {
    path: '/order',
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
  }
]

import React from 'react'

import { navList } from './local-data'

import { useOrderSearchContext } from '@/context/use-order-search'
import { NavLink } from 'react-router-dom'
import NavListWrapper from './style'

export default function NavList() {
  const { init } = useOrderSearchContext()

  const handleClick = (path) => {
    if (path === '/orders') init()
  }

  return (
    <NavListWrapper>
      {navList.map((item) => {
        return (
          <NavLink to={item.path} key={item.name} className="nav-item" onClick={() => handleClick(item.path)}>
            {item.name}
          </NavLink>
        )
      })}
    </NavListWrapper>
  )
}

import React, { memo } from 'react'

import { navList } from './local-data'

import { NavLink } from 'react-router-dom'
import NavListWrapper from './style'

export default memo(function NavList() {
  return (
    <NavListWrapper>
      {navList.map((item) => {
        return (
          <NavLink to={item.path} key={item.name} className="nav-item">
            {item.name}
          </NavLink>
        )
      })}
    </NavListWrapper>
  )
})

import React, { memo } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import { StyledSelect } from './style'

export default memo(function MSSelect(props) {
  const { value, setValue, options = [] } = props

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <StyledSelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Age"
          onChange={handleChange}
          style={{ padding: '0' }}
        >
          <MenuItem
            value="All"
          >All
          </MenuItem>
          {
            options.map(item => (
              <MenuItem
                value={item.sort}
                key={item.id}
              >
                {item.sort}
              </MenuItem>
            ))
          }
        </StyledSelect>
      </FormControl>
    </Box>
  )
})

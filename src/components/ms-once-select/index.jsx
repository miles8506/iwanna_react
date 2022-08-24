import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { StyledSelect, MSSelectWrapper } from './style'
import OutlinedInput from '@mui/material/OutlinedInput';

const ITEM_HEIGHT = 170;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MSSelect(props) {
  const { value, setValue, options = [], isShowAllValue = false, label = '', multiple = false, renderKey, valueKey, customStyle = {} } = props

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <MSSelectWrapper {...customStyle}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="simple-select-label">{label}</InputLabel>
          <StyledSelect
            labelId="simple-select-label"
            id="simple-select"
            value={value}
            onChange={handleChange}
            input={<OutlinedInput label={label} />}
            multiple={multiple}
            MenuProps={MenuProps}
          >
            {
              isShowAllValue && (
                <MenuItem
                  value="All"
                >All
                </MenuItem>
              )
            }
            {
              options.map((item, index) => (
                <MenuItem
                  value={valueKey ? item[valueKey] : item[renderKey]}
                  key={item.id ?? index}
                >
                  {item[renderKey]}
                </MenuItem>
              ))
            }
          </StyledSelect>
        </FormControl>
      </Box>

    </MSSelectWrapper >
  )
}

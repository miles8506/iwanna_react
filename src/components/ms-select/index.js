import React, { memo } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { StyledSelect, MSSelectWrapper } from './style'
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';

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

export default memo(function MSSelect(props) {
  const { value, setValue, options = [], isShowAllValue = false, label = '', multiple = false, renderKey } = props

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <MSSelectWrapper>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="simple-select-label">{label}</InputLabel>
          <StyledSelect
            labelId="simple-select-label"
            id="simple-select"
            value={value}
            label={'sort'}
            onChange={handleChange}
            input={<OutlinedInput label={label} />}
            multiple={multiple}
            renderValue={(selected) => {
              if (!(Array.isArray(selected))) return selected
              return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )
            }}
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
              options.map(item => (
                <MenuItem
                  value={item[renderKey]}
                  key={item.id}
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
})

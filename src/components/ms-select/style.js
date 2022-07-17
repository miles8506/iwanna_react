import { styled as StyledMUI } from "@mui/material"
import Select, { selectClasses } from '@mui/material/Select'

export const StyledSelect = StyledMUI(Select)(({ theme }) => {
  return {
    [`&.MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input`]: {
      padding: 0
    }
  }
})

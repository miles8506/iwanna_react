import { styled as StyledMUI } from '@mui/system'
import InputLabel, { inputLabelClasses } from '@mui/material/InputLabel'

const StyledLabel = StyledMUI(InputLabel)(({ theme }) => ({
  [`&.${inputLabelClasses.root}`]: {
    display: 'flex',
    alignItems: 'center'
  }
}))

export { StyledLabel }

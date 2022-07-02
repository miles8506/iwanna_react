import { styled as MUIstyled } from '@mui/material/styles'
import Input from '@mui/material/Input'
import inputClasses from '@mui/material/Input/inputClasses'

const StyledInput = MUIstyled(Input)(({ theme }) => ({
  [`&.${inputClasses.root}`]: {
    '&:after': {
      borderBottom: '2px solid #b78873'
    }
  }
}))

export { StyledInput }

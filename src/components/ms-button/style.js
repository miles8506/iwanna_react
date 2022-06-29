import { styled as MUIstyled } from '@mui/material/styles'
import Button, { buttonClasses } from "@mui/material/Button"

const StyledButton = MUIstyled(Button)(({ theme }) => {
  return {
    [`&.${buttonClasses.containedPrimary}`]: {
      backgroundColor: '#b78873',
    },
    [`&.${buttonClasses.root}:hover`]: {
      opacity: .9
    }
  }
})

export { StyledButton }

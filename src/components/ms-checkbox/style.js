import { styled as MUIstyled } from '@mui/material/styles'
import Checkbox from '@mui/material/Checkbox'

const StyledCheckbox = MUIstyled(Checkbox)(({ theme }) => ({
  // [`${checkboxClasses.checked}`]: {
  //   color: '#b78873'
  // },
  // [`${checkboxClasses.root}`]: {
  //   color: '#b78873'
  // },
  // [`${checkboxClasses.colorPrimary}`]: {
  //   color: '#b78873'
  // },
  // [`${checkboxClasses.colorSecondary}`]: {
  //   color: '#b78873'
  // },
  // [`${checkboxClasses.disabled}`]: {
  //   color: '#b78873'
  // },
}))

export { StyledCheckbox }

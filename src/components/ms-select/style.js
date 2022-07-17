import styled from 'styled-components'
import { styled as StyledMUI } from "@mui/material"
import Select, { selectClasses } from '@mui/material/Select'

export const StyledSelect = StyledMUI(Select)(({ theme }) => ({}))

export const MSSelectWrapper = styled.div`
  #demo-simple-select {
    padding: 10px 20px;
  }
`

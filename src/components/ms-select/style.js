import styled from 'styled-components'
import { styled as StyledMUI } from "@mui/material"
import Select, { selectClasses } from '@mui/material/Select'

export const StyledSelect = StyledMUI(Select)(({ theme }) => ({

}))

export const MSSelectWrapper = styled.div`
  width: 35%;
  min-width: 200px;

  .MuiFormControl-root {
    &::before {
      content: '';
      display: inline-block;
      width: 0;
      height: 5px;
      vertical-align: middle;
    }
    #simple-select-label {
      display: inline-block;
      vertical-align: middle;
      color: #a4725b;
    }
    .Mui-focused {
      color: #a4725b;
    }
  }
  #simple-select {
    padding: 10px 20px;
    color: #4a4a4a;
  }

  .MuiOutlinedInput-notchedOutline {
    border: 1px solid #a4725b;
  }

  .MuiOutlinedInput-root {
    &:hover .MuiOutlinedInput-notchedOutline {
      border: 1px solid #84533d;
    }
  }

  .Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid #a4725b !important;
  }

  .MuiInputLabel-root {
    color: #4a4a4a;
  }
`

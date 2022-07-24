import styled from 'styled-components'
import { styled as MUIstyled } from "@mui/system"
import TextField, { textFieldClasses } from "@mui/material/TextField"

export const MSTextFieldWrapper = styled.div`
  &::before {
    content: '';
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: bottom;
  }

  /* [slot="button"] {
    height: 20px;
    display: inline-block;
  } */

  .MuiFormControl-root.MuiTextField-root {
    display: inline-block;
  }

  .MuiInput-root {
    width: 35%;
    min-width: 200px;

    &:hover {
      &:not(.Mui-disabled) {
        &::before {
          border-bottom: 2px solid #a4725b;
        }
      }
    }
  }

  .MuiInputLabel-root {
    color: #a4725b;
  }

  .Mui-focused {
    color: #a4725b !important;
  }

  .MuiInput-root {
    &::before {
      border-bottom: 1px solid #a4725b;
    }
    &::after {
      border-bottom: 2px solid #a4725b;
    }
  }

  .MuiInput-input {
    color: #4a4a4a;
  }
`

export const StyledInput = MUIstyled(TextField)(({ theme }) => ({
  [`&.${textFieldClasses.root}`]: {
    display: 'block',
  }
}))

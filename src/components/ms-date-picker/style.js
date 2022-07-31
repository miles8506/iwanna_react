import styled from 'styled-components'

export const MSDatePickerWrapper = styled.div`
  &::before {
    content: '';
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: bottom;
  }

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

  .MuiOutlinedInput-notchedOutline {
    border: 1px solid #a4725b;
  }
  .MuiOutlinedInput-root {
    &:hover .MuiOutlinedInput-notchedOutline {
      border: 2px solid #a4725b;
    }
  }

  .MuiInputBase-root {
    .MuiOutlinedInput-notchedOutline {
      border: 1px solid #a4725b;
    }
  }

  .MuiOutlinedInput-root.Mui-focused {
    .MuiOutlinedInput-notchedOutline {
      border: 2px solid #a4725b;
    }
  }

  .MuiOutlinedInput-input {
    color: #4a4a4a;
  }
`

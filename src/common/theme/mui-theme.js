import { createTheme } from '@mui/material'

export function useCreateMUITheme() {
  return createTheme({
    palette: {
      brown: {
        main: '#b78873'
      }
    }
  })
}

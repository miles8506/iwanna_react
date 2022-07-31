import React, { memo, useState } from 'react'

import { MSDatePickerWrapper } from '@/components/ms-date-picker/style'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const MSDatePicker = memo((props) => {
  const { label, views = ['year', 'month', 'day'], dateState, setDateState } = props
  return (
    <MSDatePickerWrapper>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        views={views}
        label={label}
        value={dateState}
        onChange={(newValue) => {
          setDateState({...dateState, value: newValue});
        }}
        renderInput={(params) => {
          params.error = !dateState.status ? true : false
          params.helperText = dateState.message
          return (<TextField {...params}/>)
        }}
      />
    </LocalizationProvider>

    </MSDatePickerWrapper>
  )
})

export default MSDatePicker

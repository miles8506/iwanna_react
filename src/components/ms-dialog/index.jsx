import React from 'react'
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogActions
} from './style'

export default function MSDialog(props) {
  const { isShowDialog, fullWidth = false, title = '', content = '', footer = '' } = props
  return (
    <StyledDialog fullWidth={fullWidth} open={isShowDialog}>
      <StyledDialogTitle>{title}</StyledDialogTitle>
      <StyledDialogContent>{content}</StyledDialogContent>
      <StyledDialogActions>{footer}</StyledDialogActions>
    </StyledDialog>
  )
}

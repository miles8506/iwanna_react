import { styled as MUIstyled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle, { dialogTitleClasses } from '@mui/material/DialogTitle'
import DialogContent, { dialogContentClasses } from '@mui/material/DialogContent'
import DialogActions, { dialogActionsClasses } from '@mui/material/DialogActions'

const StyledDialog = MUIstyled(Dialog)(({ theme }) => ({
}))

const StyledDialogTitle = MUIstyled(DialogTitle)(({ theme }) => ({
  [`&.${dialogTitleClasses.root}`]: {
    backgroundColor: 'rgb(67 65 65)',
    color: '#fff',
  }
}))

const StyledDialogContent = MUIstyled(DialogContent)(({ theme }) => ({
  [`&.${dialogContentClasses.root}`]: {
    backgroundColor: 'rgb(67 65 65)',
    color: '#fff'
  }
}))

const StyledDialogActions = MUIstyled(DialogActions)(({ theme }) => ({
  [`&.${dialogActionsClasses.root}`]: {
    padding: '15px 24px',
    backgroundColor: 'rgb(67 65 65)',
    color: '#fff'
  }
}))

export {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogActions
}

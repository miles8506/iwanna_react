import React, { memo, useState } from 'react'

import { ToolbarWrapper } from './style'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import Toolbar from '@mui/material/Toolbar'
import MSDialog from '@/components/ms-dialog'
import MSButton from '@/components/ms-button'

const MSToolbar = memo(function (props) {
  const {
    numSelected,
    selected,
    title,
    handleDeleteRow
  } = props

  const [isShowDialog, setIsShowDialog] = useState(false)

  const handleWarningAlert = () => {
    setIsShowDialog(true)
  }
  const closeDialog = () => {
    setIsShowDialog(false)
  }

  const footer = (
    <div>
      <MSButton
        value="取消"
        color="error"
        style={{
          marginRight: '10px',
          border: '1px solid rgba(255, 255, 255, .5)',
          color: 'rgba(255, 255, 255, .5)'
        }}
        variant="outlined"
        onClick={closeDialog}
      />
      <MSButton
        value="確定"
        color="info"
        variant="outlined"
        style={{
          border: '1px solid #bd4c4c',
          color: '#bd4c4c'
        }}
        onClick={e => handleDeleteRow(selected, closeDialog)}
      />
    </div>
  )

  return (
    <ToolbarWrapper>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: '#dfc4b8'
          })
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {title}
          </Typography>
        )}

        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton onClick={handleWarningAlert}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <MSDialog
        isShowDialog={isShowDialog}
        title="Warning"
        content="確定要刪除該檔期種類？"
        footer={footer}
        fullWidth={true}
      />
    </ToolbarWrapper>
  )
})

export default MSToolbar

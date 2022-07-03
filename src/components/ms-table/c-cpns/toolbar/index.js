import React, { memo } from 'react'

import { ToolbarWrapper, TypograhpyWrapper } from './style'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import Toolbar from '@mui/material/Toolbar'

const MSToolbar = memo(function (props) {
  const { numSelected, selected, handleDeleteRow, setSelected } = props

  function foo() {
    // console.log(numSelected, selected);
    console.log('foo')
  }

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
            Sort List
          </Typography>
        )}

        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton onClick={e => handleDeleteRow(selected, setSelected)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </ToolbarWrapper>
  )
})

export default MSToolbar

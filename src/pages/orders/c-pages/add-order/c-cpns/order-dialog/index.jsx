import React, { memo, useState } from 'react'

// import { headerCells } from '../body/config'
import { useCreateMUITheme } from '@/common/theme/mui-theme.js'

import { ThemeProvider } from '@mui/material'
import MSTable from '@/components/ms-table'
import Dialog from '@mui/material/Dialog'
import List from '@mui/material/List'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { OrderDialogWrapper } from './style'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OrderDialog = memo((props) => {
  const { openDialog, setOpenDialog, orderList, delOrder } = props

  const theme = useCreateMUITheme()

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <OrderDialogWrapper>
      <ThemeProvider theme={theme}>
        <Dialog
          fullScreen
          open={openDialog}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <List sx={{ flex: 1, padding: '30px', backgroundColor: '#f1f1f1' }}>
            {/* <MSTable
              title="Order List"
              rows={orderList}
              headerCells={headerCells}
              handleDeleteRow={delOrder}
            ></MSTable> */}
          </List>
        </Dialog>
      </ThemeProvider>
    </OrderDialogWrapper>
  )
})

export default OrderDialog

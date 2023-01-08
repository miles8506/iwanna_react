import React, { memo, useState } from 'react'

import { requestGetCanningMessage, requestAddCanningMessage } from '@/service/canning-message'
import { getCurrentTimeStamp } from '@/utils/time'

import { AddCanningMessageWrapper } from './style'
import BaseLayout from '@/layout/base-page'
import MSButton from '@/components/ms-button'
import TextareaAutosize from '@mui/base/TextareaAutosize'

const AddCanningMessage = memo((props) => {
  const { history } = props

  const [messageVal, setMessageVal] = useState('')
  const [warnMessage, setWarnMessage] = useState('');

  const confirmClick = async () => {
    if (messageVal.trim() === '') return setWarnMessage('罐頭訊息不得為空')

    const allMessage = await requestGetCanningMessage('cans')
    const isSomeMessage = allMessage.docs.some(item => item.data().message === messageVal)

    if (isSomeMessage) return setWarnMessage('罐頭訊息已重複，請輸入其他罐頭訊息')

    const timeStamp = String.toString(getCurrentTimeStamp())
    await requestAddCanningMessage('cans', timeStamp, { id: timeStamp, message: messageVal })
    history.push('/canning-message')
  }

  return (
    <AddCanningMessageWrapper>
      <BaseLayout>
        <h2 slot="header">增加罐頭訊息</h2>
        <div slot="body">
          <div className="message-text-area">
            <label htmlFor="messageText">罐頭訊息</label>
            <TextareaAutosize
              id="messageText"
              style={{ width: '35%', height: '100px', resize: 'none' }}
              onChange={(e) => setMessageVal(e.target.value)}
              value={messageVal}
            />
          </div>
          <div className="warn-message">{ warnMessage }</div>
        </div>
        <div slot="footer">
          <MSButton
            style={{ marginRight: '10px' }}
            variant="outlined"
            color="error"
            value="cancel"
            onClick={e => history.push('/canning-message')}
          />
          <MSButton
            variant="outlined"
            color="success"
            value="confirm"
            onClick={confirmClick}
          />
        </div>
      </BaseLayout>
    </AddCanningMessageWrapper>
  )
})

export default AddCanningMessage

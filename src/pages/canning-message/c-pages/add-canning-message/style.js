import styled from 'styled-components'

export const AddCanningMessageWrapper = styled.div`
  height: 100%;

  .message-text-area {
    display: flex;
    align-items: top;
    gap: 0 20px;
    color: rgba(0,0,0,0.6);
    font-weight: 700;
  }

  .warn-message {
    margin-top: 5px;
    color: red;
  }
`

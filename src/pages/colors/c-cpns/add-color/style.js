import styled from 'styled-components'

const AddColorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;

  .header {
    color: rgba(0, 0, 0, 0.6);
  }

  .body {
    flex: 1;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
  }

  .header,
  .body,
  .footer {
    padding: 10px 15px;
    background-color: #fff;
    border-radius: 10px;
  }
`

export { AddColorWrapper }

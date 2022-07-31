import styled from 'styled-components'

export const BasePageLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;

  [slot="header"] {
    color: rgba(0, 0, 0, 0.6);
  }

  [slot="body"] {
    flex: 1;
    overflow-y: auto;
  }

  [slot="footer"] {
    display: flex;
    justify-content: flex-end;
  }

  [slot="header"],
  [slot="body"],
  [slot="footer"] {
    padding: 10px 15px;
    background-color: #fff;
    border-radius: 10px;
  }
`

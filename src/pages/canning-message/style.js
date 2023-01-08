import styled from 'styled-components'

export const CanningMessageWrapper = styled.div`
  height: 100%;

  .header {
    display: flex;
    justify-content: flex-end;
  }

  .content {
    height: calc(100% - 100px);
    overflow-y: auto;
    background-color: #fff;
  }
`

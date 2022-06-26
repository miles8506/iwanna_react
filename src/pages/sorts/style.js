import styled from 'styled-components'

const SortsWrapper = styled.div`
  height: 100%;

  .header {
    display: flex;
    justify-content: flex-end;
  }

  .body {
    height: calc(100% - 44px);
    margin-top: 30px;
    overflow-y: scroll;
  }
`

export { SortsWrapper }
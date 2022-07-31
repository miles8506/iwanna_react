import styled from 'styled-components'

const SortsWrapper = styled.div`
  height: 100%;

  .header {
    display: flex;
    justify-content: flex-end;
  }

  .body {
    height: calc(100% - 31px);
    margin-top: 5px;
    overflow-y: auto;
    background-color: #fff;
    border-radius: 10px;
  }
`

export { SortsWrapper }

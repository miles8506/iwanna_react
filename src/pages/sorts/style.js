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

    &::-webkit-scrollbar {
      background-color: #dfc4b8;
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #909090;
      border-radius: 10px;
    }
  }
`

export { SortsWrapper }

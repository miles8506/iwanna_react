import styled from 'styled-components'

export const FunctionBarWrapper = styled.div`
  display: flex;

  .filter-area {
    flex: 1;

    &-status {
      display: flex;
      gap: 0 10px;
    }

    .input-wrap {
      display: flex;
      margin-top: 20px;
      gap: 15px 20px;
      flex-wrap: wrap;


      .filter-area-input {
        display: flex;

        label {
          width: 90px;
          padding-right: 5px;
          color: #505050;

          &::before {
            content: '';
            display: inline-block;
            height: 110%;
            vertical-align: middle;
          }
        }
      }
    }
  }

  .control-area {
    width: 110px;
  }
`

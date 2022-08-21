import styled from 'styled-components'

export const EditOrderWrapper = styled.div`
  height: 100%;

  div[slot="header"] {
    font-size: 24px;
  }

  .goods {
    margin: 20px 0;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 3px 1px  rgba(0 ,0 ,0 , .4);

    .item {
      padding: 10px 0;
      color: #404040;

      & > span {
        color: #999;
      }
    }
  }
`

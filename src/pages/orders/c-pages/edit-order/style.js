import styled from 'styled-components'

export const EditOrderWrapper = styled.div`
  height: 100%;
  padding: 20px;
  background-color: #dfc4b8;

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

  .remark-area {
    display: flex;
    gap: 0 20px;

    .canning-message-list {
      width: 300px;
      height: 200px;
      padding: 10px;
      background-color: rgba(183, 136, 115, .3);
      border-radius: 10px;
      overflow-y: auto;
    }

    .message-item {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      padding: 10px;
      color: #545454;

      &:hover {
        border-radius: 10px;
        background-color: rgba(183, 136, 115, .3);
      }
    }
  }
`

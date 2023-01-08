import styled from 'styled-components'

export const AddOrderBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px 0;
  position: relative;

  .factory-num-search {
    display: flex;
    align-items: center;
    gap: 0 20px;
  }

  .factory-num {
    &-label,
    &-text {
      display: inline-block;
    }

    &-label {
      color: #a4725b;
    }

    &-text {
      color: #4a4a4a;
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

  .add-order-total {
    position: absolute;
    left: 0;
    bottom: -40px;
    color: #545454;
  }
`

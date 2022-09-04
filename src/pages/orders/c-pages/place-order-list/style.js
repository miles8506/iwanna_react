import styled from 'styled-components'

export const PlaceOrderListWrapper = styled.div`
  height: 100%;
  padding: 20px;
  background-color: #dfc4b8;

  .place-order {
    height: 100%;

    &-title {
      display: flex;
      justify-content: space-between;
      color: rgba(0, 0, 0, 0.6);
    }

    &-content {
      height: 100%;
      margin-bottom: 20px;
      padding: 25px 20px;
      border-radius: 10px;
      background-color: #fff;

      .list {
        height: calc(100% - 40px);

        .header {
          display: flex;
          padding: 20px 0 10px;
          font-size: 20px;
          color: #505050;
          border-bottom: 2px solid #999;
        }

        .body {
          height: calc(100% - 111px);
          overflow-y: auto;

          .item {
            display: flex;
            padding: 10px 0;
            border-bottom: 1px solid #999;
            color: #5f5f5f;
          }
        }

        .total {
          & > h2 {
            color: #505050;
          }
        }
      }
    }
  }
`

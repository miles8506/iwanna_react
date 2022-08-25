import styled from 'styled-components'

export const PlaceOrderListWrapper = styled.div`
  height: 100%;
  .place-order {
    height: 100%;

    &-title {
      display: flex;
      justify-content: space-between;
      color: rgba(0, 0, 0, 0.6);
    }

    &-content {
      height: calc(100% - 80px);
      margin-bottom: 20px;
      padding: 15px 10px;
      border-radius: 10px;
      background-color: #fff;
    }

    &-footer {
      display: flex;
      justify-content: flex-end;
      padding: 15px 10px;
      border-radius: 10px;
      background-color: #fff;
    }
  }
`

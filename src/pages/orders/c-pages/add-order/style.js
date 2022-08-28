import styled from 'styled-components'

export const AddOrderWrapper = styled.div`
  height: 100%;
  padding: 20px;
  background-color: #dfc4b8;

  div[slot="body"] {
    position: relative;
  }

  .add-order-icon {
    position: fixed;
    top: 110px;
    right: 45px;

    .order-count {
      display: inline-block;
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      border-radius: 20px;
      background-color: #f06d6d;
      color: #fff;
    }
  }
`

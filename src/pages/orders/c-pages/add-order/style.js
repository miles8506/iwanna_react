import styled from 'styled-components'

export const AddOrderWrapper = styled.div`
  height: 100%;

  div[slot="body"] {
    position: relative;
  }

  .add-order-icon {
    position: fixed;
    top: 95px;
    right: 30px;

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

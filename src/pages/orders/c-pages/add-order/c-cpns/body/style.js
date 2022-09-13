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

  .add-order-total {
    position: absolute;
    left: 0;
    bottom: -40px;
    color: #545454;
  }
`

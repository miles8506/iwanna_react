import styled from 'styled-components'

export const GoodsBodyWrapper = styled.div`
  .item {
    padding: 15px 0;
    color: #a4725b;

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
    }

    span[class$="-text"] {
      color: #4a4a4a;
    }
  }
`

import styled from 'styled-components'

export const DisplayPriceBoxWrapper = styled.div`
  .base-price,
  .lowest-price,
  .suggest-price {
    padding: 10px 0;

    [class$="value"] {
      display: inline-block;
      color: #4a4a4a;
    }

    [class$="label"] {
      display: inline-block;
      width: 100px;
      color: #a4725b;
    }
  }
`

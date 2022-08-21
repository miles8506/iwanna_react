import styled from 'styled-components'

export const BaseDetailWrapper = styled.div`
  padding: 10px;
  border: 1px solid #000;
  border-radius: 10px;

  .item {
    padding: 10px 0;
    color: #404040;

    & > span {
      display: inline-block;
      padding-left: 5px;
      color: #999;
    }
  }
`

import styled from 'styled-components'

const ColorsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .header {
    display: flex;
    justify-content: flex-end;
  }

  .content {
    flex: 1;
    background-color: #fff;
  }
`

export { ColorsWrapper }

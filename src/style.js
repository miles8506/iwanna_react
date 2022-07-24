import styled from 'styled-components'

const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow-x: auto;
`

const MainWrapper = styled.div`
  display: inline-block;
  /* width: calc(100% - 200px); */
  flex: 1;
  min-width: 1000px;
  height: 100%;
  padding: 20px 10px;
  background-color: #dfc4b8;
`

export { AppWrapper, MainWrapper }

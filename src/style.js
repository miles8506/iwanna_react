import styled from 'styled-components'

const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
`

const MainWrapper = styled.div`
  display: inline-block;
  width: calc(100% - 200px);
  height: 100%;
  padding: 20px 10px;
  background-color: #f9f9f9;
`

export {
  AppWrapper,
  MainWrapper
}
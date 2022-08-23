import styled from 'styled-components'

const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow-x: auto;

  textarea {
    padding: 5px;
    font-size: 14px;
    color: #404040;
    border-radius: 5px;
    border-color: #a4725b;
    outline-color: #a4725b;
  }
`

const MainWrapper = styled.div`
  display: inline-block;
  flex: 1;
  min-width: 1000px;
  height: 100%;
  padding: 20px 10px;
  background-color: #dfc4b8;
`

export { AppWrapper, MainWrapper }

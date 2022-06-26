import styled from 'styled-components'

const NavListWrapper = styled.div`
  display: inline-block;
  min-width: 200px;
  height: 100%;
  padding: 15px 10px 15px 15px;
  vertical-align: top;
  
  .nav-item {
    display: block;
    height: 40px;
    margin-bottom: 20px;
    padding-left: 30px;
    line-height: 40px;
    text-decoration: none;
    color: #4a4a4a;
    border: 1px solid #fff;
    cursor: pointer;
  }

  .active {
    border: 1px solid #b78873;
    border-radius: 5px;
    color: #b78873;
  }
`

export default NavListWrapper
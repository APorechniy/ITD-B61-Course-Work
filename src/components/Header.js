import React, { Component } from 'react'
import styled from 'styled-components'
import { AppBar, FormControl, Button, ButtonGroup } from '@material-ui/core'
import { Link } from 'react-router-dom'

class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.id
        }
    }

    render() {
        let { id } = this.state
            return(
                    <div>
                      <h1 align="center">Система настройки звуковых оповещений<Link style={{color: '#FFFFFF', textDecoration: 'none', float: 'right'}}  to={{pathname: "/"}}><Button size="small" color="inherit">Выйти</Button></Link></h1>
<ul className="header"> <StyleHeader>

                          <li>       <Link  to={{pathname: "/timetable", state: {id: id}}}><Button  size="small">Расписание звонков</Button></Link></li>
                          <li>       <Link to={{pathname: "/weekends", state: {id: id}}}><Button size="small">Выходные дни</Button></Link></li>
                          <li>       <Link  to={{pathname: "/main", state: {id: id}}}><Button size="small">Главная</Button></Link></li>
                          <li>       <Link  to={{pathname: "/changes", state: {id: id}}}><Button size="small">Изменения</Button></Link></li>
                          <li>       <Link to={{pathname: "/settings", state: {id: id}}}><Button size="small" >Настройки пользователя</Button></Link></li>

              </StyleHeader>      </ul>
                    </div>
            )
        }
}


export default Header;

const StyleHeader = styled.div`
  background-color: #0066ff;
  margin: 0;
    padding: 0;

    display: inline;
`;

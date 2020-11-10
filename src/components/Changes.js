import React, { Component } from 'react'
import Header from './Header'
import axios from 'axios'
import styled from 'styled-components'
import { Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow , Button} from '@material-ui/core'
import "./index.css";


const styles = {
  root: {
    background: 'linear-gradient(45deg, #FF4040 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 9,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 122,
    padding: '0 80px',
  },
};

class Changes extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.location.state.id,
            user: {},
            readyLogs: false,
            logs: []
        }
        this.getLogs = this.getLogs.bind(this)
    }

    async getLogs() {
        try {
            await axios.get('http://localhost:3000/logs').then(res => {
                this.setState({
                    logs: res.data,
                    readyLogs: true
                })
            })
        }
        catch {
            alert("Error data loading. Plz, refresh page")
        }
    }

    componentDidMount() {
        let { readyLogs } = this.state
        if(!readyLogs){
            this.getLogs()
        }
    }

    render() {
        let { id, logs, readyLogs } = this.state
        if(readyLogs){
        return(
            <div>
                <Header id={id}/>
                <Container>
                <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                {columns.map((item) => {
                                    return(
                                        <TableCell key={item.id}>{item.label}</TableCell>
                                    )
                                })}
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {logs.map((note, index) => {
                                    return (
                                            <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {note.login}
                                            </TableCell>
                                            <TableCell align="left">{note.prevState}</TableCell>
                                            <TableCell align="left">{note.newState}</TableCell>
                                            <TableCell align="left">{note.move}</TableCell>
                                            </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                        </TableContainer>
                        </Container>
                        <Text>
                                                  <Paper  style = {styles.root} className="card">
                                                  <div align="center" >
                                                    <h2>Добавление записей в данную таблицу производится автоматически</h2>
                                                    <p> </p>

                                                  </div>


                                                  </Paper>
                                                  <Paper className="card">
                                                  <div align="left" style={{marginLeft: 18 + '%'}} >
                                                    <h4>содержатся записи о измененииях:</h4>
                                                    <p>- таблицы времени подачи звуковых оповещений</p>
                                                    <p>- таблицы пользователей системы</p>
                                                    <p>- таблицы выходных дней</p>
                                                  </div>


                                                  </Paper>

                                                  <div align="center">
                                                    <div className="card">
                                                    <p> возможность пользовательского удаления данных о редактировании системы не допускается</p>
                                                                  </div>
                                                  </div>

                                              </Text>
            </div>
        )} else {
            return (<div>Загрузка страницы...</div>)
        }
    }
}

export default Changes;

const columns = [
    { id: 'Login', label: 'Логин', minWidth: 170 },
    { id: 'prevState', label: 'Предыдущее состояние', minWidth: 170 },
    { id: 'newState', label: 'Новое состояние', minWidth: 170 },
    { id: 'move', label: 'Действие', minWidth: 170 }
]

const Text = styled.div`
    width: 30%;
    float: left;
`;

const Container = styled.div`
    width: 70%;
    float: left;
`;

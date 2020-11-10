import React, { Component } from 'react'
import { Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow , Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios'
import Header from './Header'
import Loader from 'react-loaders'
import "./index.css";

const columns = [
    { id: 'id', label: '№', minWidth: 170 },
    { id: 'start', label: 'Начальное время', minWidth: 170 },
    { id: 'finish', label: 'Время окончания', minWidth: 170 },
    { id: 'type', label: 'Тип сигнала', minWidth: 170 },
    { id: 'update', label: '', minWidth: 50 },
    { id: 'delete', label: '', minWidth: 50 }
]


const Container = styled.div`
    width: 68%;
    float: left;
`;

const Text = styled.div`
    width: 32%;
    float: left;
`;

const Preloader = styled.div`
    width: 100%;
    padding-left: 40%;
    padding-top: 30vh;
`;

class Timetable extends Component {
    constructor(props){
        super(props);
        let id = 0;
        try{
            id = this.props.location.state.id
        } catch {
            id = this.props.id
        }

        this.state = {
            calls: [],
            readyCalls: false,
            readyUsers: false,
            updateMode: false,
            updateId: 0,
            id: id,
            user: {},
            prevStart: '',
            prevFinish: ''
        }
        this.createTableData = this.createTableData.bind(this)
        this.getCalls = this.getCalls.bind(this)
        this.setUpdateMode = this.setUpdateMode.bind(this)
        this.saveHandle = this.saveHandle.bind(this)
        this.changeFinishTime = this.changeFinishTime.bind(this)
        this.changeStartTime = this.changeStartTime.bind(this)
        this.changeType = this.changeType.bind(this)
        this.deleteCall = this.deleteCall.bind(this)
        this.addCall = this.addCall.bind(this)
        this.getUser = this.getUser.bind(this)
    }

    async getCalls() {
        try {
            await axios.get('http://localhost:3000/calls').then(res => {
                this.setState({
                    calls: res.data,
                    readyCalls: true
                })
            })
        }
        catch {
            alert("Error data loading. Plz, refresh page")
        }
    }

    async getUser() {
        try{
            let result;
            let { loadData, id } = this.state
            if(!loadData){
                await axios.get(`http://localhost:3000/users/${id}`).then(res => {
                    result = res.data
                })
                this.setState({
                    user: result[0],
                    loadData: true
                })
            }
        }
        catch {
            alert("Error data download. Please refresh page")
        }
    }

    createTableData() {
        let { calls } = this.state
        let res = calls.map((call) => {
            return (
                {
                    id: call.id,
                    start: call.start,
                    finish: call.finish,
                    type: call.type
                }
            )
        })
        return res
    }

    setUpdateMode(val) {
        this.setState({
            updateMode: true,
            updateId: val
        })
    }

    saveHandle(obj) {
        let { calls, user, prevFinish, prevStart } = this.state
        let buffer = calls.find((item) => {
            if(item.id == obj.id){
               return item
            }
        })
        calls.sort((a,b) => {
            if(a.start > b.start){
                return a
            } else {
                return b
            }
        })
        axios.post("http://localhost:3000/add-logs", {
            login: user.login,
            prevState: `Начальное время: ${prevStart}, Конечное время: ${prevFinish}`,
            newState: `Начальное время: ${buffer.start}, Конечное время: ${buffer.finish}`,
            move: 'Изменение звонка'
        }).then(res => {
            console.log(res)
        })
        this.setState({
            updateMode: false,
            calls: calls,
            prevFinish: '',
            prevStart: ''
        })
        axios.post("http://localhost:3000/update-calls", {start: buffer.start, finish: buffer.finish, type: buffer.type, id: buffer.id}).then(res => {

        })
    }

    changeFinishTime(e, id) {
        let { calls } = this.state
        let buffer = ''
        calls.map((item) => {
            if(item.id == id){
                buffer = item.finish
                item.finish = e.target.value
            }
        })
        this.setState({
            prevFinish: buffer,
            calls: calls
        })
    }

    changeStartTime(e, id) {
        let { calls } = this.state
        let buffer = ''
        calls.map((item) => {
            if(item.id == id){
                buffer = item.start
                item.start = e.target.value
            }
        })
        this.setState({
            prevStart: buffer,
            calls: calls
        })
    }

    changeType(e, id) {
        let { calls } = this.state
        calls.map((item) => {
            if(item.id == id){
                item.type = e.target.value
            }
        })
        this.setState({
            calls: calls
        })
    }

    deleteCall(callId) {
        let { calls, user } = this.state
        let deleteItem = calls.find((item) => {
            if(callId == item.id){
                return item
            }
        })
        let buffer = calls.filter((item) => {
             return item.id != callId
        })
        axios.post("http://localhost:3000/delete-calls", {id: callId}).then(res => {

        })
        axios.post("http://localhost:3000/add-logs", {
            login: user.login,
            prevState: `ID: ${deleteItem.id}`,
            newState: 'deleted',
            move: 'Удаление звонка'
        }).then(res => {
            console.log(res)
        })
        this.setState({
            calls: buffer
        })
    }

    addCall() {
        let { calls, user } = this.state
        let newId = calls[calls.length-1].id + 1
        calls.push({
            id: newId,
            start: '00:00:00',
            finish: '00:00:00',
            type: ''
        })
        this.setState({
            calls: calls
        })
        axios.post("http://localhost:3000/add-calls", {
            id: newId,
            start: '00:00:00',
            finish: '00:00:00',
            type: '',
            userId: 1
        }).then(res => {
            console.log(res)
        })
        axios.post("http://localhost:3000/add-logs", {
            login: user.login,
            prevState: 'null',
            newState: '00:00:00',
            move: 'Добавление звонка'
        }).then(res => {
            console.log(res)
        })
    }

    componentDidMount() {
        let { readyCalls } = this.state
        if(!readyCalls){
            this.getCalls()
            this.getUser()
        }
    }

    render() {
        let { readyCalls, updateMode, updateId, id} = this.state
        if(readyCalls){
            const rows = this.createTableData()
            return(
                <div>
                    <Header id={id}/>
                    <Container>
                    <Paper>
                      <h2 align="center"> Текущее расписание подачи звукового сигнала </h2>
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
                            {rows.map((row) => {
                                if(updateMode && row.id == updateId){
                                    return (
                                        <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="left"><Input value={row.start} onChange={(e) => this.changeStartTime(e, row.id)}></Input></TableCell>
                                        <TableCell align="left"><Input value={row.finish} onChange={(e) => this.changeFinishTime(e, row.id)}></Input></TableCell>
                                        <TableCell align="left"><Input value={row.type} onChange={(e) => this.changeType(e, row.id)}></Input></TableCell>
                                        <TableCell align="left" size="small"><Button onClick={(e) => this.saveHandle(row)}><SaveIcon /></Button></TableCell>
                                        </TableRow>
                                    )
                                } else {
                                    return (
                                            <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="left">{row.start}</TableCell>
                                            <TableCell align="left">{row.finish}</TableCell>
                                            <TableCell align="left">{row.type}</TableCell>
                                            <TableCell align="left" size="small"><Button onClick={(e) => this.setUpdateMode(row.id)}><UpdateIcon /></Button></TableCell>
                                            <TableCell align="left" size="small"><Button onClick={(e) => this.deleteCall(row.id)}><DeleteIcon /></Button></TableCell>
                                            </TableRow>
                                    )
                                }
                                })}
                                </TableBody>
                            </Table>
                            </TableContainer>
                            <TableRow key='add'>
                                <TableCell>
                                <TableCell size="small">
                            <Button onClick={this.addCall}><AddIcon /></Button>
                            </TableCell>
                                </TableCell>

                            </TableRow>

                        </Paper>
                        </Container>
                        <Text>
                                                  <Paper className="card">
                                                  <div align="center" >
                                                    <h2>Обратите внимание!</h2>
                                                    <p> </p>

                                                  </div>


                                                  </Paper>
                                                  <Paper>
                                                  <div align="center" >
                                                    <p>осуществление операций</p>
                                                    <p>добаления, удаления, редактирования</p>
                                                    <p>данной таблицы следует производить </p>
                                                    <p> лишь после тщательного согласования, </p>
                                                    <h4>поскольку они приводят к</h4>
                                                    <h3 style = {{color: "red"}}>изменениям в базе данных</h3>

                                                  </div>


                                                  </Paper>

                                                  <div align="center">
                                                    <div className="card">
                                                    <p> изменения данной таблицы</p>
                                                    <p>будут отражены во вкладке "Изменения"</p>
                                                    <p>и занесены в базу данных</p>
                                                    </div>
                                                  </div>

                                              </Text>
                </div>
            )
        } else {
            return (
                <div>Preload...</div>
            )
        }
    }
}

export default Timetable;

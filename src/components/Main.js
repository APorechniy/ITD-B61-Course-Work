import React, { Component } from 'react'
import Header from './Header'
import axios from 'axios'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Add';
import { Paper, Button } from '@material-ui/core'

class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentTime: new Date(),
            readyCalls: false,
            readyNotes: false,
            calls: [],
            notes: [],
            id: this.props.location.state.id
        }
        this.setValue = this.setValue.bind(this)
        this.goClock = this.goClock.bind(this)
        this.getCalls = this.getCalls.bind(this)
        this.formattedDate = this.formattedDate.bind(this)
        this.nextBell = this.nextBell.bind(this)
        this.getNotes = this.getNotes.bind(this)
    }

    setValue(val) {
        this.setState({
            currentTime: val
        })
    }

    goClock() {
        const interval = setInterval(
          () => this.setValue(new Date()),
          1000
        );
        return () => {
          clearInterval(interval);
        }
    }

    async getCalls() {
        try {
            await axios.get('http://localhost:3000/calls').then(res => {
                console.log(res.data)
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

    async getNotes() {
        let { id } = this.state
        try {
            await axios.get(`http://localhost:3000/notes/${id}`).then(res => {
                console.log(res.data)
                this.setState({
                    notes: res.data,
                    readyNotes: true
                })
            })
        }
        catch {
            alert("Error data loading. Plz, refresh page")
        }
    }

    formattedDate(date) {
        let hh = date.getHours()
        if(hh < 10) hh = '0' + hh;

        let mm = date.getMinutes()
        if(mm < 10) mm = '0' + mm;

        return hh + ":" + mm ;
    }

    nextBell() {
        let { calls } = this.state
        let current = new Date()
        let next = "Завтра"
        let need = calls.find((item) => {
            let sh = item.start[0] + item.start[1]
            let fh = item.finish[0] + item.finish[1]
            let sm = item.start[3] + item.start[4]
            let fm = item.finish[3] + item.finish[4]
            if(Number(sh) > current.getHours()){
                return item.start
            } else {
                if(Number(fh) > current.getHours()){
                    return item.finish
                } else {
                    if(Number(sh) == current.getHours() && Number(sm) > current.getMinutes()){
                        return item.start
                    } else {
                        if(Number(fh) == current.getHours() && Number(fm) > current.getMinutes()){
                            return item.finish
                        }
                    }
                }
            }
        })
        let res;
        if(need == undefined) {
            return (next)
        } else {
            if(Number(need.start[0] + need.start[1]) > current.getHours()){
                res = need.start
            } else {
                if(Number(need.finish[0] + need.finish[1]) > current.getHours()){
                    res = need.finish
                } else {
                    if(Number(need.start[0] + need.start[1]) == current.getHours() && Number(need.start[3] + need.start[4]) > current.getMinutes()){
                        res = need.start
                    } else {
                        if(Number(need.finish[0] + need.finish[1]) == current.getHours() && Number(need.finish[3] + need.finish[4]) > current.getMinutes()){
                            res = need.finish
                        }
                    }
                }
            }
        }
        let h = (Number(res[0]+res[1]) - current.getHours())
        let m = (Number(res[3]+res[4]) - current.getMinutes())
        if(h < 10){
            h = "0" + h
        }
        if(m < 10 && m >= 0){
            m = "0" + m
        }
        if(m < 0){
            h = h - 1
            m = 60 - Math.abs(Number(res[3]+res[4]) - current.getMinutes())
        }
        if(m < 10 && m >= 0){
            m = "0" + m
        }
        res = h + ":" + m
        return res
    }

    componentDidMount() {
        let { readyCalls, readyNotes } = this.state
        if(!readyCalls){
            this.getCalls()
        }
        if(!readyNotes){
            this.getNotes()
        }
    }

    render() {
        let { currentTime, readyCalls, calls, id, notes } = this.state
        this.goClock()
        
        if(readyCalls){
            return(
                <div>
                    <Header id={id}/>
                    <Current  style = {styles.rootA}>
                    <h4>Текущее время: {this.formattedDate(currentTime)}</h4>
                    </Current>
                    <NextBell style = {styles.rootD}>
                        <h4>Следующий звонок через : {this.nextBell()}</h4>
                    </NextBell>
                    <Container>
                        {notes.map((item) => {
                            if(item.status == "Process"){
                            return (
                                <Paper>
                                    <p>{item.id},
                                    {item.description},
                                    {item.priority}</p>
                                </Paper>
                            )}
                            if(item.status == "Success"){
                                return (
                                    <Paper>
                                        <s>{item.id},
                                        {item.description},
                                        {item.priority}</s>
                                    </Paper>
                                )}
                            }                        
                        )}
                        <Paper>
                            <Button><AddIcon /></Button>
                        </Paper>
                    </Container>
                </div>
            )
        } else {
            return( <div>Загрузка страницы...</div>)
        }

    }
}

export default Main;

const Current = styled.div`
    width: 30%;
    float: left;
    padding-left: 5%;
    h4 {
        margin-bottom: 5vh;
    }
`;

const NextBell = styled.div`
    width: 30%;
    float: left;
    margin-left: 5%;
`;

const Container = styled.div`
    width: 100%;
    float: left;
`;

const styles = {
    rootA: {
      background: 'linear-gradient(45deg, #FF4040 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 9,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 42,
      padding: '0 80px',
    },
    rootD: {
      background: 'linear-gradient(45deg, #008080 10%, #AA8E53 90%)',
      border: 0,
      borderRadius: 9,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 42,
      padding: '0 80px',
    },
  };

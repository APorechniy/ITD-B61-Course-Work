import React, { Component } from 'react'
import Header from './Header'
import axios from 'axios'
import { FormControl, Input, Button } from '@material-ui/core'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'

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



const localizer = momentLocalizer(moment)

class Weekends extends Component {
    constructor(props){
        super(props)
        this.state = {
            weekDate: new Date(),
            weekNote: '',
            id: this.props.location.state.id,
            events: []
        }
        this.weekDateHandle = this.weekDateHandle.bind(this)
        this.weekNoteHandle = this.weekDateNote.bind(this)
        this.addWeekend = this.addWeekend.bind(this)
    }

    weekDateHandle(v) {
        this.setState({
            weekDate: v
        })
    }

    weekDateNote(v) {
        this.setState({
            weekNote: v
        })
    }

    addWeekend(e) {
        let { weekDate, weekNote } = this.state

    }

    render() {
        let { weekDate, weekNote, id, events } = this.state
        return(
            <div >
                <Header id={id} />
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />


                    <FormControl style ={{marginLeft: 20 + '%', marginTop: 30}}>
                <Button style = {styles.rootA}   onClick={(e) => this.goToNew()}>Добавить праздничный день</Button>  </FormControl>
                <FormControl style={{marginLeft: 10 + '%', marginTop: 30}}>  <Button style = {styles.rootD} onClick={(e) => this.handleChange()}>Удалить праздничный день</Button>
                  </FormControl>
            </div>
        )
    }
}

export default Weekends;

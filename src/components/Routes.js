import React from 'react';
import { Route } from 'react-router-dom';
import SignIn from './SignIn'
import Timetable from './Timetable'
import Weekends from './Weekends'
import Changes from './Changes'
import Main from './Main'
import Settings from './Settings'
import AddUser from './AddUser'

const Routes = () => (
    <main>
        <Route exact path="/" component={SignIn}></Route>
        <Route path="/timetable" component={Timetable}></Route> 
        <Route path="/weekends" component={Weekends}></Route>       
        <Route path="/changes" component={Changes}></Route>
        <Route path="/main" component={Main}></Route>
        <Route path="/settings" component={Settings}></Route>
        <Route path="/add-user" component={AddUser}></Route>
    </main>
)

export default Routes
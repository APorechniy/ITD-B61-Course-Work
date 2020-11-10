import React, { Component } from "react";
import axios from "axios";
import { Paper, Input, Button, FormControl } from '@material-ui/core';
import styled from 'styled-components';
import regeneratorRuntime from "regenerator-runtime";

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: {},
            loadData: false,
            login: "",
            pass: ""
        }
        this.auth = this.auth.bind(this)
        this.handleEnter = this.handleEnter.bind(this)
        this.setLogin = this.setLogin.bind(this)
        this.setPass = this.setPass.bind(this)
        this.getUsers = this.getUsers.bind(this)
    }

    auth() {
        let { users, login, pass } = this.state
        let succsesfull = false
        users.map((item) => {
            if(item.login == login && item.password == pass){
               succsesfull = true
               this.props.history.push({
                   pathname: "/timetable",
                   state: { id: item.id}
               })
            }
        })
        if(!succsesfull){
            alert("Incorrect login or password")
            this.setState({
                login: '',
                pass: ''
            })
        }
    }

    handleEnter(e) {
        if(e.keyCode == '13'){
            this.auth()
        }
    }

    async getUsers() {
        try{
            let result;
            let { loadData } = this.state
            if(!loadData){
                await axios.get(`http://localhost:3000/users`).then(res => {
                    result = res.data
                })
                this.setState({
                    users: result,
                    loadData: true
                })
            }
        }
        catch {
            alert("Error data download. Please refresh page")
        }
    }

    setLogin(val) {
        this.setState({
            login: val
        })
    }

    setPass(val) {
        this.setState({
            pass: val
        })
    }

    enterHandle(e) {
        console.log(e)
        if(e.keyCode == 13){
            this.auth()
        }
    }

    componentDidMount(){
        this.getUsers()
    }

    render() {
        const { loadData, login, pass} = this.state
        if(!loadData){
            return(
                <div>Загрузка страницы</div>
            )
        } else {
            return(
                        <Container>
                              <Paper>
                                <FormControl>
                                  <h2 >Авторизация</h2>
                                      <Input placeholder="   Введите свой логин" value={login}  onChange={(event) => this.setLogin(event.target.value)}></Input>
                                      <br></br>
                                      <Input placeholder="   Введите свой пароль" value={pass} onChange={(event) => this.setPass(event.target.value)} ></Input>
                                      <br></br>
                                      <Button  size="large" onClick={this.auth} onKeyPress={(e) => this.handleEnter(e)}>  <h4 >Продолжить</h4></Button>
                                </FormControl>
                               </Paper>
                        </Container>
        )}
    }
}
export default SignIn;

const Container = styled.div`
    position: absolute;
    top: 25vh;
    left: 37%;
    width: 30%;
    height: 30%;
    text-align: center;
`;

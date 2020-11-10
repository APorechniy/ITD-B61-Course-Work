import React, { Component } from 'react'
import Header from './Header'
import axios from 'axios'
import { Paper, FormControl, Input, Button } from '@material-ui/core'
import styled from 'styled-components'

const styles = {
  root: {
    background: 'linear-gradient(45deg, #FF4040 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 9,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 32,
    padding: '0 80px',
  },
};


class AddUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: {},
            newUser: {
                login: '',
                password: '',
                name: '',
                surname: '',

            },
            loadData: false,
            id: this.props.location.state.id
        }
        this.getUser = this.getUser.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.createNewUser = this.createNewUser.bind(this)
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

    handleChange(val, type) {
        let { newUser } = this.state
        newUser[type] = val
        this.setState({
            newUser: newUser
        })
    }

    createNewUser() {
        let { newUser, user } = this.state
        axios.post("http://localhost:3000/add-user", newUser).then(res => {
            console.log(res)
        })
        axios.post("http://localhost:3000/add-logs", {
            login: user.login,
            prevState: `-`,
            newState: `Новый пользователь: ${newUser.login}`,
            move: 'Добавление пользователя'
        }).then(res => {
            console.log(res)
        })
        this.props.history.push({
            pathname: "/settings",
            state: { id: user.id}
        })
    }

    componentDidMount() {
        this.getUser()
    }

    render() {
        let { loadData, id, newUser } = this.state
        if(loadData){
            return(
                <div>
                    <Header id={id}/>
                    <FormContainer>
                        <Paper style={{paddingTop: 2 + 'vh', paddingBottom: 2 + 'vh'}}>
                        <h3 align="center">Новый пользователь</h3>
                        <hr></hr>
                        <FormControl style={{marginLeft: 10 + '%'}}>
                            <h4>Логин</h4><Input required value={newUser.login} onChange={(e) => this.handleChange(e.target.value, 'login')}></Input>
                            <h4>Пароль</h4><Input required value={newUser.password} onChange={(e) => this.handleChange(e.target.value, 'password')}></Input>
                            <h4>Имя</h4><Input required value={newUser.name} onChange={(e) => this.handleChange(e.target.value, 'name')}></Input>
                            <h4>Фамилия</h4><Input required value={newUser.surname} onChange={(e) => this.handleChange(e.target.value, 'surname')}></Input>
                        </FormControl>
                        <FormControl style={{marginLeft: 20 + '%'}}>
                            <h4>Отчество</h4><Input required value={newUser.patronum} onChange={(e) => this.handleChange(e.target.value, 'patronum')}></Input>
                            <h4>Телефон</h4><Input required value={newUser.phone} onChange={(e) => this.handleChange(e.target.value, 'phone')}></Input>
                            <h4>E-mail</h4><Input required value={newUser.email} onChange={(e) => this.handleChange(e.target.value, 'email')}></Input>
                            <h4>Отдел</h4><Input required value={newUser.departament} onChange={(e) => this.handleChange(e.target.value, 'departament')}></Input>
                        </FormControl>
                        </Paper>
                        <Button style={{marginLeft: 35 + '%'}} onClick={(e) => this.createNewUser()}>Добавить пользователя</Button>
                    </FormContainer>
                </div>
            )
        } else {
            return (

                <div>Загрузка страницы...</div>
            )
        }
    }
}

export default AddUser;

const FormContainer = styled.div`
    width: 50%;
    margin-left: 25%;
`;

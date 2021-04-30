import React, { Component } from 'react';
import APiService from '../../APiService';

import TestField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


class AddUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state ={
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            age: '',
            salary: '',
            message: null
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    saveUser = (e) => {
        e.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.age,
            salary: this.state.salary
        }

        APiService.addUser(user)
            .then((res) => {
                this.setState({
                    message: user.username + '님이 성공적으로 등록되었습니다.'
                })
                console.log(this.state.message);
            })
            .catch((err) => {
                console.log('saveUser() 에러', err)
            });

    }

    render() {
        const { saveUser, onChange } = this;
        const { username, password, firstName, lastName, age, salary, message } = this.state;
        return (
            <div>
                <Typography variant="h4" style={style}>Add User</Typography>
                <form style={formContainer}>
                    <TestField type="text" placeholder="input your name" name="username"
                        fullWidth margin="normal" value={username} onChange={onChange} />
                    <TestField type="password" placeholder="input your password" name="password"
                        fullWidth margin="normal" value={password} onChange={onChange} />
                    <TestField type="text" placeholder="input your first name" name="firstName"
                        fullWidth margin="normal" value={firstName} onChange={onChange} />
                    <TestField type="text" placeholder="input your last name" name="lastName"
                        fullWidth margin="normal" value={lastName} onChange={onChange} />
                    <TestField type="number" placeholder="input your age" name="age"
                        fullWidth margin="normal" value={age} onChange={onChange} />
                    <TestField type="number" placeholder="input your salary" name="salary"
                        fullWidth margin="normal" value={salary} onChange={onChange} />
                    <Button variant="contained" color="primary" onClick={saveUser}>저장</Button>
                </form>
            </div>
        )
    }
}
const formContainer = {
    display: 'flex',
    fiexFlow: 'row wrap'
}
const style = {
    dispay: 'flex',
    justifyContent: 'center'
}
export default AddUserComponent;
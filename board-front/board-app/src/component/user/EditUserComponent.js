import React, { Component } from 'react';
import APiService from '../../APiService';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class EditUserComponent extends Component {
    constructor(props) {
        super(props);
        this.setState({
            id: '',
            firstName: '',
            lastName: '',
            age: '',
            salary: '',
            message: null,
        })
    }

    componentDidMount() {
        this.loadUser();
    }
    loadUser = () => {
        APiService.fetchUserByID(window.localStorage.getItem("userID"))
            .then((res) => {
                let user = res.data;
                this.setState({
                    id: user.id,
                    username: user.name,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age,
                    salary: user.salary
                })
            })
            .catch((err) => {
                console.log('loadUser() error', err);
            });

    }
    onChange = (e) => {
        [e.target.name] = e.target.value;
    }

    saveUser = (e) => {
        e.preventDefault();
    }

    render() {
        const { username, password, firstName, lastName, age, salary, message } = this.state;
        const { saveUser, onChange } = this;
        return (
            <div>
                <Typography variant="h4" style={style}>Add User</Typography>
                <form>
                    <TextField type="text" placeholder="input your name" name="username" readOnly="true"
                        fullWidth margin="normal" value={username} onChange={onChange} />
                    <TextField type="text" placeholder="input your first name" name="firstName"
                        fullWidth margin="normal" value={firstName} onChange={onChange} />
                    <TextField type="text" placeholder="input your last name" name="lastName"
                        fullWidth margin="normal" value={lastName} onChange={onChange} />
                    <TextField type="number" placeholder="input your age" name="age"
                        fullWidth margin="normal" value={age} onChange={onChange} />
                    <TextField type="number" placeholder="input your salary" name="salary"
                        fullWidth margin="normal" value={salary} onChange={onChange} />
                    <Button variant="contained" color = "primary" onClick={saveUser}>저장</Button>
                </form>
            </div>
        )
    }
}
const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default EditUserComponent;
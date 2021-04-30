import React, { Component } from 'react';
import APiService from '../../APiService';

class EditUserComponent extends Component {
    constructor(props) {
        super(props);
        this.setState({
            id: '',
            firstName: '',
            lastName: '',
            age: '',
            salary: '',
            message : null,
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
        const {saveUser,onChange} = this;
        return(
        <div>
            <h2>Add User</h2>
            <form>
                <div>
                    <label>유저 이름 :</label>
                    <input type="text" placeholder="input your name" name="username" readOnly="true"
                        value={username} onChange={onChange} />
                </div>
                <div>
                    <label>성 :</label>
                    <input type="text" placeholder="input your first name" name="firstName"
                        value={firstName} onChange={onChange} />
                </div>
                <div>
                    <label> 이름 :</label>
                    <input type="text" placeholder="input your last name" name="lastName"
                        value={lastName} onChange={onChange} />
                </div>
                <div>
                    <label>나이 :</label>
                    <input type="number" placeholder="input your age" name="age"
                        value={age} onChange={onChange} />
                </div>
                <div>
                    <label>연봉 :</label>
                    <input type="number" placeholder="input your salary" name="salary"
                        value={salary} onChange={onChange} />
                </div>
                <button onClick={saveUser}>저장</button>
            </form>
        </div>
        )
    }
}

export default EditUserComponent;
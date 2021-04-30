import React, { Component } from 'react';
import APiService from '../../APiService';

class AddUserComponent extends Component {
    constructor(props) {
        super(props);

        this.setState({
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            age: '',
            salary: '',
            message: null
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    saveUser = (e) => {
        e.prevantDefalut();

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
        const {saveUser, onChange} = this;
        const { username, password, firstName, lastName, age, salary, message } = this.state;
        return (
            <div>
                <h2>Add User</h2>
                <form>
                    <div>
                        <label>유저 이름 :</label>
                        <input type="text" placeholder="input your name" name="username"
                            value={username} onChange={onChange} />
                    </div>
                    <div>
                        <label>비밀 번호 :</label>
                        <input type="password" placeholder="input your password" name="password"
                            value={password} onChange={onChange} />
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

export default AddUserComponent;
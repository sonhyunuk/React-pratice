import React, { Component } from 'react';
import APiService from '../../APiService';

class UserListComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            message: null
        }
    }

    componentDidMount () {
        this.reloadUserList();
    }

    reloadUserList = () => {
        APiService.fetchUsers()
            .then((res) => {
                this.setState({
                    users: res.data
                })
            })
            .catch(err =>{
                console.log('reloadUserList() ERROR',err);
            })
    }


    deleteUser = (userID) => {
        APiService.deleteUser(userID)
            .then((res) =>{
                this.setState({
                    message : 'User Deleted Successfully.'
                });
                this.setState({
                    users : this.state.users.filter(user => user.id !== userID)
                });
            })

    }

    editUser = (ID) => {
        window.localStorage.setItem("userID", ID);
        this.props.history.push('/edit-user');

    }

    addUser = () => {
        window.localStorage.removeItem("userID");
        this.props.history.push('/add-user');
    }

    render() {
        const { reloadUserList, deleteUser, editUser, addUser } = this;
        const { users, message } = this.state;
        return (
            <div>
                <h2>유저 리스트</h2>
                <button onClick={addUser}> 유저 생성</button>

                <table border="1">
                    <thead>
                        <tr>
                            <th>아이디</th>
                            <th>성</th>
                            <th>이름</th>
                            <th>직급</th>
                            <th>나이</th>
                            <th>연봉</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) =>
                            <tr key={user.id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.userName}</td>
                                <td>{user.age}</td>
                                <td>{user.salary}</td>
                                <td>
                                    <button onClick={() => editUser(user.id)}>수정</button>
                                    <button onClick={() => deleteUser(user.id)}>삭제</button>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

}
export default UserListComponent;
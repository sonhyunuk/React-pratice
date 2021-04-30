import React, { Component } from 'react';
import APiService from '../../APiService';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

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
                <Typography variant="h4" style={style}>유저리스트</Typography>
                <Button variant="contained" color="primary" onClick={addUser}> 유저 생성</Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>아이디</TableCell>
                            <TableCell>성</TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>직급</TableCell>
                            <TableCell>나이</TableCell>
                            <TableCell>연봉</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) =>
                            <TableRow key={user.id}>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.userName}</TableCell>
                                <TableCell>{user.age}</TableCell>
                                <TableCell>{user.salary}</TableCell>
                                <TableCell>
                                    <button onClick={() => editUser(user.id)}>수정</button>
                                    <button onClick={() => deleteUser(user.id)}>삭제</button>

                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        )
    }
    
}
const style = {
    display : 'flex',
    justifyContent: 'center'
}
export default UserListComponent;
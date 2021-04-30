import axio from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/users";

class APiService{

    fetchUsers(){
        return axio.get(USER_API_BASE_URL);
    }
    fetchUserByID(userID){
        return axio.get(USER_API_BASE_URL+'/'+userID);
    }
    deleteUser(userID){
        return axio.delete(USER_API_BASE_URL + '/' +userID);
    }
    addUser(user){
        return axio.post(USER_API_BASE_URL,user);
    }
    editUser(user){
        return axio.put(USER_API_BASE_URL+'/'+user.id,user);
    }
}

export default new APiService();
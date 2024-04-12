
import axios from 'axios'


const getUser = async (id: string) => {
    const user = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    return user.json();
}

const getAllUsers = async () => {
    const users = await fetch(`https://jsonplaceholder.typicode.com/users`);
    return users.json();
}

interface ResponsePayload{
    id: number
    username: string
    email: string
    password: string
    admin: boolean
}
interface UserPayload{
    username: string
    email?: string
    password: string
}

function CreateUser(formData: any): Promise<any>{
    const payload: UserPayload = {
        username: formData.username,
        email: formData.email,
        password: formData.password
    }
    return axios.post(`/api/users`, payload).then((user)=>user).catch((e)=> e)
}

function LogInUser(formData: any): Promise<any>{
    const payload: UserPayload = {
        username: formData.username,
        password: formData.password,
        email: formData.email
    }
    return axios.post(`/api/login`, payload).then((token)=>token).catch((e)=> e)
}



export default  {getUser, getAllUsers, CreateUser, LogInUser};

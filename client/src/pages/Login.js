import { useState } from "react";
import Auth from '../utils/auth';
import { login } from "../api/authAPI";
//import { useHistory } from 'react-router-dom';
const Login = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };
    // const handleSubmit = async (e: FormEvent) => {
    //   e.preventDefault();
    //   try {
    //     const data = await login(loginData);
    //     Auth.login(data.token);
    //   } catch (err) {
    //     console.error('Failed to login', err);
    //   }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(loginData);
            if (data.success && data.token) {
                Auth.login(data.token); // Call login only if token is available
            }
            else {
                // Handle error case
                console.error('Login failed: ', data.message);
            }
        }
        catch (err) {
            console.error('Failed to login', err);
        }
    };
    return (<div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Username</label>
        <input type='text' name='username' value={loginData.username || ''} onChange={handleChange}/>
      <label>Password</label>
        <input type='password' name='password' value={loginData.password || ''} onChange={handleChange}/>
        <button type='submit'>Submit Form</button>
      </form>
    </div>);
};
export default Login;
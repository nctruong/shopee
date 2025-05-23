import {useState} from 'react'
import axios from "axios";

export default () => {
    const [email, setEmail] = useState('test@example.com');
    const [password, setPassword] = useState('235r44343')
    const [errors, setErrors] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/users/signup', {
                email, password
            })
        } catch (e) {
            setErrors(e.response.data.errors)
            console.error(e.response.data.errors)
        }
    }

    return <form onSubmit={onSubmit}>
        <h1>Sign up</h1>
        <div className={"form-group"}>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" id="email"
                   type="email" placeholder="Email"/>
        </div>

        <div className={"form-group"}>
            <label htmlFor="password">Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} className="form-control" id="password"
                   type="password" placeholder="Password"/>
        </div>
        <div className={"alert alert-danger"}>
            <ul className={"list-group my-0"}>
                {errors && errors.map(err => (
                    <li>{err.message}</li>
                ))}
            </ul>
        </div>
        <button type="submit btn btn-primary">Sign up</button>
    </form>
}

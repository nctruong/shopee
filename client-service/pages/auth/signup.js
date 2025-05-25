import {useState} from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/use-request'

export default () => {
    const [email, setEmail] = useState('test@example.com');
    const [password, setPassword] = useState('1234')

    const {doRequest, errors} = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {email, password},
        onSuccess: async () => {
            console.log("Redirecting...");
            await Router.push('/')
        }
    })

    const onSubmit = async (e) => {
        console.log("Submitting...");
        e.preventDefault()
        await doRequest()
    }

    return <form onSubmit={onSubmit} className="">
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
        {errors}
        <button type="submit btn btn-primary">Sign up</button>

    </form>
}

import {useState} from "react";
import useRequest from "../../hooks/use-request.js";
import Router from "next/router";

export default () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { doRequest, errors } = useRequest({
        url: '/api/users/signin',
        method: 'POST',
        body: {email, password},
        onSuccess: () => Router.push('/')
    })

    const onSubmit = async (e) => {
        e.preventDefault()
        await doRequest()
    }
    return <form onSubmit={onSubmit}>
        <h1>Sign In</h1>
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

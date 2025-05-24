import {useState} from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/use-request'

export default () => {
    const [email, setEmail] = useState('test@example.com');
    const [password, setPassword] = useState('235r44343')

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

        <div
            className="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
            <img className="size-12 shrink-0" src="/img/logo.svg" alt="ChitChat Logo"/>
            <div>
                <div className="text-xl font-medium text-black dark:text-white">ChitChat</div>
                <p className="text-gray-500 dark:text-gray-400">You have a new message!</p>
            </div>
        </div>
    </form>
}

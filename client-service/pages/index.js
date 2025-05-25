import buildClient from '../api/build-client'

const LandingPage = ({currentUser}) => {
    return <h1>Landing Page {JSON.stringify(currentUser)}</h1>
}

LandingPage.getInitialProps = async context => {
    console.log('on server')

    const { data } = await buildClient(context).get('/api/users/currentUser')
    console.log(data)
    return data
}

export default LandingPage;

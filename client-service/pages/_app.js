import '../styles/globals.css';
import Header from "../components/header";
import buildClient from "../api/build-client.js";

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return <div className="">
        <Header currentUser={currentUser} />
        <div className="max-w-7xl mx-auto p-6 mt-5">
            <Component currentUser={currentUser} {...pageProps} />
        </div>
    </div>
}

AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(
            appContext.ctx,
            client,
            data.currentUser
        );
    }

    return {
        pageProps,
        ...data,
    };
};

export default AppComponent;


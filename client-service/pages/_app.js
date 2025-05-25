import '../styles/globals.css';
import buildClient from "../api/build-client.js";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps }) => {
    // console.log(`AppComponent props`, props);
    return <div>
        <Header currentUser={pageProps.currentUser} />
        <Component {...pageProps} />
    </div>
}

export default AppComponent;


import '../styles/globals.css';
import Header from "../components/header";

const AppComponent = ({ Component, pageProps }) => {
    return <div>
        <Header currentUser={pageProps.currentUser} />
        <Component {...pageProps} />
    </div>
}

export default AppComponent;


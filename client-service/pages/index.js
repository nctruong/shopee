import buildClient from '../api/build-client'
import {getCurrentUser} from "../lib/get-current-user.js";

const LandingPage = ( {currentUser} ) => {
    return <h1>Landing Page {JSON.stringify(currentUser)}</h1>
}

export const getServerSideProps = async (context) => {
    const currentUser = await getCurrentUser(context);

    return {
        props: {
            currentUser,
        },
    };
};

export default LandingPage;

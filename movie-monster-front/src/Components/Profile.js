import {useParams} from 'react-router-dom';
import CustomNav from "./CustomNav";

const Profile = (props) => {
    let { username } = useParams();

    return (
        <div>
            <CustomNav></CustomNav>
            <h1>{username}'s Page</h1>
        </div>
    );
}

export default Profile;
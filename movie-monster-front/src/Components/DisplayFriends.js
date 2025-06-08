import CustomNav from "./CustomNav";
import { useParams } from 'react-router-dom';

const DisplayFriends = () => {
    let { username } = useParams();
    return (
        <div>
            <CustomNav/>
            <h1>Displaying {username}'s friends</h1>
        </div>
    )
}

export default DisplayFriends;
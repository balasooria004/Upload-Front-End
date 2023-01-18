import {useLocation , useParams} from 'react-router-dom';

function View(){
    const {testValue} = useParams();

    const Location = useLocation();
    console.log(testValue);
    console.log(Location.state)
    return(
        <h1>
            NOTHING HERE!!
        </h1>
    );
}

export default View;
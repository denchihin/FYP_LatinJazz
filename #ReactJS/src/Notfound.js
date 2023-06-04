import { Link } from "react-router-dom";

const NotFound = () => {

    return(
        <div className="not-found">
            <h2>Oops</h2>
            <p>Tha Page is not Found</p>
            <Link to ="/"> Return to Home Page</Link>
        </div>  
    );
}

export default NotFound;
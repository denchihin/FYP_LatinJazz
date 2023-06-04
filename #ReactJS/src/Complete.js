import { MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";


function Complete() {
const navigate = useNavigate();
const BacktoManu =() =>{
    navigate("/Manufacturer");
}

return(
<div>
    <h1 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>New Artwork has been created</h1>
    <MDBBtn onClick={BacktoManu} className="mb-4 px-5" color='dark' size='lg'> Return to Menu </MDBBtn>
</div>
);


}
export default Complete;
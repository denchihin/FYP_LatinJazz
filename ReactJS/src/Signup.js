import {useState} from "react";
import { useNavigate } from "react-router-dom";
import './index.css';
import Web3 from 'web3';
import useWeb3 from "./useWeb3";

import {
    MDBBtn,MDBContainer,MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput,
  }
  from 'mdb-react-ui-kit';


function Signup() {

    const [newParticipant, setNewParticipant] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [participantType, setPartType] = useState("");

    const {contract} = useWeb3(); //connection to the Blockchain smart contract
    
    const navigate = useNavigate();

    const onConnect = async (e) => {
      e.preventDefault();
        let provider = window.ethereum;
        if (typeof provider !== "undefined") {
          await provider.request({ method: "eth_requestAccounts" });
          const web3 = new Web3(provider);
          const accounts = await web3.eth.getAccounts();
          const account = accounts[0];
          
          await contract.methods.addParticipant(email, password, account , participantType).send({ from: account});
          const theParticipant = await contract.methods.getParticipant(account).call();

          setNewParticipant(theParticipant);
          console.log(theParticipant);

          navigate("/");
  
        } else {
          console.log("Non-ethereum browser detected.Please install Metamask");
        }
      };


return(

<form onSubmit={onConnect}>
<MDBContainer className="my-5">

<MDBCard>
  <MDBRow className='g-0'>

    <MDBCol md='6'>
      <MDBCardImage src='https://www.vanityteen.com/wp-content/uploads/2019/12/sandro-SS20-vanityteen-09-1.jpg' alt="login form" className='rounded-start w-100'/>
    </MDBCol>

    <MDBCol md='6'>
      <MDBCardBody className='d-flex flex-column'>

        <div className='d-flex flex-row mt-2'>
          <MDBIcon fas icon="crop-alt fa-2x me-3" style={{ color: '#d63384' }}/>
          <span className="h2 fw-bold mb-0">ArtistryTracker</span>
        </div>

        <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>SignUp a new account</h5>

          <MDBInput wrapperClass='mb-4' label='Email address' id='EmailSignup' type='email' size="lg" value={email} onChange={(e)=> setEmail(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='PassSignup' type='password' autoComplete="on" size="lg" value={password} onChange={(e)=> setPassword(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Type' id='TypeSignup' type='text' autoComplete="on" size="lg" value={participantType} onChange={(e)=> setPartType(e.target.value)}/>

        <MDBBtn className="mb-4 px-5" color='dark' size='lg'>SUBMIT</MDBBtn>
{/* 
        <a className="small text-muted" href="#!">Forgot password?</a>
        <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="#!" style={{color: '#393f81'}}>Register here</a></p>
 */}
        <div className='d-flex flex-row justify-content-start'>
          <a href="https://www.sandro-paris.com.hk/en_HK/membership-term-and-condition/MembershipTermAndCondition.html" className="small text-muted me-1">Terms of use.</a>
          <a href="https://www.smcp.com/en/privacy-policy/" className="small text-muted">Privacy policy</a>
        </div>

      </MDBCardBody>
    </MDBCol>

  </MDBRow>
</MDBCard>

</MDBContainer>
</form>
    );

}


export default Signup;
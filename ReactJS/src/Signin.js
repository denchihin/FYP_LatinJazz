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
    MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem
  }
  from 'mdb-react-ui-kit';


function Signin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [participantType, setPartType] = useState("");
    const [authentic, setAuthenic] = useState(false);

    const {contract} = useWeb3(); //connection to the Blockchain smart contract

    const navigate = useNavigate();

    const onConnect = async (e) => {
        e.preventDefault();
        setAuthenic (false)
        console.log(authentic);
        let provider = window.ethereum;
        if (typeof provider !== "undefined") {
          await provider.request({ method: "eth_requestAccounts" });
          const web3 = new Web3(provider);
          const accounts = await web3.eth.getAccounts();
          const account = accounts[0];
          const theAuthentic = await contract.methods.authenticateParticipant(account, email, password, participantType).call();
          // const theParticipant = await contract.methods.getParticipant(account).call();
          setAuthenic (theAuthentic);
          console.log(theAuthentic );
          if (theAuthentic == true && participantType =="Manufacturer"){
            navigate ("/Manufacturer")
            }
            else if ( theAuthentic == true && participantType =="Supplier"){
              navigate ("/Supplier")
              } else {
                console.log("Account or Password incorrect");
              }
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
      <MDBCardImage src='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi3MF2JQCVjCGgG-Aa0dywceHrp0ZvCDHqwks09p-rM6kZ_URrMDGq84TJ9E96w2pyNrOb4sPdghawyB4axsDy2AbjUfd74tr6ZYMwrCXDeIJMT51azE7GwoWYDemCFZD3JJ0VMz6qW_Kvc-9TOMIichzKGg7UkrAI-E7hRAgU3BK7tjIKJbGr6rGkHpQ/s961/Maje%20SS23%20Rabbit%20Girl%20On%20The%20Moon_KV5.jpg' alt="login form" className='rounded-start w-100'/>
    </MDBCol>

    <MDBCol md='6'>
      <MDBCardBody className='d-flex flex-column'>

        <div className='d-flex flex-row mt-2'>
          <MDBIcon fas icon="crop-alt fa-2x me-3" style={{ color: '#d63384' }}/>
          <span className="h2 fw-bold mb-0">ArtistryTracker</span>
        </div>

        <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

          <MDBInput wrapperClass='mb-4' label='Email address' id='EmailSignin' type='email' size="lg" value={email} onChange={(e)=> setEmail(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='PassSignin' type='password' autoComplete="on" size="lg" value={password} onChange={(e)=> setPassword(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Type' id='TypeSignin' type='text' autoComplete="on" size="lg" value={participantType} onChange={(e)=> setPartType(e.target.value)}/>


        <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Login</MDBBtn>
        <a className="small text-muted" href="#!">Forgot password?</a>
        <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="#!" style={{color: '#393f81'}}>Register here</a></p>

        <div className='d-flex flex-row justify-content-start'>
          <a href="#!" className="small text-muted me-1">Terms of use.</a>
          <a href="#!" className="small text-muted">Privacy policy</a>
        </div>

      </MDBCardBody>
    </MDBCol>

  </MDBRow>
</MDBCard>

</MDBContainer>
</form>
    );

}

export default Signin;
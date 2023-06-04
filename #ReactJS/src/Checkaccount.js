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


function Checkaccount() {

    const [email, setEmail] = useState("");
    const [mmAccount, setmmAccount] = useState("");
    const [partType, setPartType] = useState("");
    const [isPending, setIsPending] = useState(false);

    const {contract} = useWeb3(); //connection to the Blockchain smart contract
      
    const onConnect = async (e) => {
        e.preventDefault();

        let provider = window.ethereum;
        if (typeof provider !== "undefined") {
          await provider.request({ method: "eth_requestAccounts" });
          const web3 = new Web3(provider);
          const accounts = await web3.eth.getAccounts();
          const account = accounts[0];
          const theParticipant = await contract.methods.getParticipant(account).call()
          let nameP = (theParticipant.userName);
          let addressP = (theParticipant.address);
          let typeP =(theParticipant.participantType);
          setEmail(nameP);
          setmmAccount(addressP);
          setPartType(typeP);
          console.log(nameP , addressP , typeP);
        } else {
          console.log("Non-ethereum browser detected.Please install Metamask");
        }
        setIsPending(true);
      };


return(

<form onSubmit={onConnect}>
<MDBContainer className="my-5">

<MDBCard>
  <MDBRow className='g-0'>

    <MDBCol md='6'>
      <MDBCardImage src='https://www.voguehk.com/media/2021/03/156616846_244458917396728_5194131809664170657_n.jpg' alt="login form" className='rounded-start w-100'/>
    </MDBCol>

    <MDBCol md='6'>
      <MDBCardBody className='d-flex flex-column'>

        <div className='d-flex flex-row mt-2'>
          <MDBIcon fas icon="crop-alt fa-2x me-3" style={{ color: '#d63384' }}/>
          <span className="h2 fw-bold mb-0">ArtistryTracker</span>
        </div>

        <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Check your Account detail</h5>

        { isPending && <h4 className="fw-bolder text-start" style={{letterSpacing: '1px'}}>Registerd Email address</h4>}
        { isPending && <h5 className="fw-normal pb-3 text-start" style={{letterSpacing: '1px'}}>{email}</h5>}
        
        { isPending && <h4 className="fw-bolder text-start" style={{letterSpacing: '1px'}}>Account Access</h4>}
        { isPending && <h5 className="fw-normal pb-3 text-start" style={{letterSpacing: '1px'}}>{partType}</h5>}

        { isPending && <h4 className="fw-bolder text-start" style={{letterSpacing: '1px'}}>Account Address</h4>}
        { isPending && <h5 className="fw-normal pb-3 text-start" style={{letterSpacing: '1px'}}>{mmAccount}</h5>}

        <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Check Account</MDBBtn>

      </MDBCardBody>
    </MDBCol>

  </MDBRow>
</MDBCard>

</MDBContainer>
</form>
    );

}

export default Checkaccount;
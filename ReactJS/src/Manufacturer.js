import App from "./App";
import Signin from "./Signin";
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
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  }
  from 'mdb-react-ui-kit';

function Manufacturer() {
    const [artwork, setArtwork] = useState("");
    const [barcode, setBarcode] = useState("");
    const [artName, setArtName] = useState("");
    const [serialNum, setSerialNum] = useState("");
    const [cost, setCost] = useState("");

    const {contract} = useWeb3(); //connection to the Blockchain smart contract
    
    const navigate = useNavigate(); //define page navigation 

    const [centredModal, setCentredModal] = useState(false); //MDB popup define
    const toggleShow = () => setCentredModal(!centredModal);

    const onConnect = async (e) => {
      e.preventDefault();
        let provider = window.ethereum;
        if (typeof provider !== "undefined") {
          await provider.request({ method: "eth_requestAccounts" });
          const web3 = new Web3(provider);
          const accounts = await web3.eth.getAccounts();
          const account = accounts[0];
          
          await contract.methods.addArtwork(account, barcode , artName , serialNum , cost).send({ from: account});
          const theArtwork = await contract.methods.getArtwork(barcode).call();
          let nameArt = theArtwork.artworksName
          setArtwork(theArtwork.artworkName);
          console.log(artwork , theArtwork.artworkName);
          // navigate("/complete");
  
        } else {
          console.log("Non-ethereum browser detected.Please install Metamask");
        }
      };

    const onConfirm = async (e) =>{
        e.preventDefault();
        toggleShow();
    }

return(

<form onSubmit={onConfirm}>
<MDBContainer className="my-5">

<MDBCard>
  <MDBRow className='g-0'>

    <MDBCol md='6'>
      <MDBCardImage src='https://jurassicasia-bucket.s3.ap-northeast-1.amazonaws.com/images/story/section/1effb8b172724669885ed22b06f3b3c0.png' alt="login form" className='rounded-start w-100'/>
    </MDBCol>

    <MDBCol md='6'>
      <MDBCardBody className='d-flex flex-column'>

        <div className='d-flex flex-row mt-2'>
          <MDBIcon fas icon="crop-alt fa-2x me-3" style={{ color: '#d63384' }}/>
          <span className="h2 fw-bold mb-0">Create New Artwork</span>
        </div>

        <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Create new Artowkrs in ArtistryTrack</h5>

          <MDBInput wrapperClass='mb-4' label='Barcode' id='barcode' type='text' size="lg" value={barcode} onChange={(e)=> setBarcode(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Artwork Name' id='artName' type='text'  size="lg" value={artName} onChange={(e)=> setArtName(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Serial Number' id='serialNum' type='text'  size="lg" value={serialNum} onChange={(e)=> setSerialNum(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Cost of the Artwork' id='cost' type='number'  size="lg" value={cost} onChange={(e)=> setCost(e.target.value)}/>

        <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Create new Artwork</MDBBtn>

        <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
            <MDBModalDialog centered>
            <MDBModalContent>
                <MDBModalHeader>
                <MDBModalTitle>Modal title</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                <h2>BarCode: {barcode}</h2>
                <h2>Artwork Name: {artName}</h2>
                <h2>Serial Number: {serialNum}</h2>
                <h2>cost: {cost}</h2>
                </MDBModalBody>
                <MDBModalFooter>
                <MDBBtn  className="mb-4 px-5" color='secondary' size='lg'> Close </MDBBtn>
                <MDBBtn onClick={onConnect} className="mb-4 px-5" color='dark' size='lg' >Save changes</MDBBtn>
                </MDBModalFooter>
            </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
      </MDBCardBody>
    </MDBCol>

  </MDBRow>
</MDBCard>

</MDBContainer>
</form>
    );

}

export default Manufacturer;
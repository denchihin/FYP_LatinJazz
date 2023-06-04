import App from "./App";
import Signin from "./Signin";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import './index.css';
import Web3 from 'web3';
import useWeb3 from "./useWeb3";
import Swal from "sweetalert2";

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
          toggleShow();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Artwork has been Created',
            showConfirmButton: false,
            timer: 1500
          })

          navigate("/Manufacturer");
  
        } else {
          console.log("Non-ethereum browser detected.Please install Metamask");
        }
      };

        const onConfirm = async (e) =>{
        e.preventDefault();
        toggleShow();
        }

        const onArtSearch = async (e) =>{
        navigate("/CheckAW");
        }
        const onQuit = async (e) =>{
        navigate("/");
        }
        const onTransfer = async (e) =>{
          navigate("/Transfer");
          }
          const onTrack = async (e) =>{
              navigate("/Tracker");
              }
        const onCreateAcc = async (e) =>{
        navigate("/Signup");
        }
        const onAccSearch = async (e) =>{
        navigate("/CheckAC");
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

          <MDBInput wrapperClass='mb-4' required label='Barcode / NFC' id='barcode' type='text' size="lg" value={barcode} onChange={(e)=> setBarcode(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' required label='Artwork Name' id='artName' type='text'  size="lg" value={artName} onChange={(e)=> setArtName(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' required label='Serial Number' id='serialNum' type='text'  size="lg" value={serialNum} onChange={(e)=> setSerialNum(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' required label='Price' id='cost' type='number'  size="lg" value={cost} onChange={(e)=> setCost(e.target.value)}/>

        <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Create new Artwork</MDBBtn>
        <MDBBtn onClick={onArtSearch} className="mb-4 px-5" color='dark' size='lg'>Search Artowrk</MDBBtn>
        <MDBBtn onClick={onTrack} className="mb-4 px-5" color='dark' size='lg'>Tracker</MDBBtn>
        <MDBBtn onClick={onTransfer} className="mb-4 px-5" color='dark' size='lg'>Transfer</MDBBtn>
        <MDBBtn onClick={onCreateAcc} className="mb-4 px-5" color='dark' size='lg'>Create Account</MDBBtn>
        <MDBBtn onClick={onAccSearch} className="mb-4 px-5" color='dark' size='lg'>Check Account</MDBBtn>
        <MDBBtn onClick={onQuit} className="mb-4 px-4" color='white' size='lg'>Log out</MDBBtn>

        <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
            <MDBModalDialog centered>
            <MDBModalContent>
                <MDBModalHeader>
                <MDBModalTitle>Create New Artistry Product</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                <h4 className="fw-normal pb-3 text-start">BarCode/NFC: {barcode}</h4>
                <h5 className="fw-normal pb-3 text-start">Artwork Name: </h5>
                <h3 className="fw-bold pb-3 text-start">{artName}</h3>
                <h5 className="fw-bold pb-3 text-start">Serial Number: {serialNum}</h5>
                <h5 className="fw-bold pb-3 text-start">Price: {cost}</h5>
                </MDBModalBody>
                <MDBModalFooter>
                <MDBBtn  className="mb-4 px-5" color='secondary' size='lg'> Close </MDBBtn>
                <MDBBtn onClick={onConnect} className="mb-4 px-5" color = 'dark' size='lg' >Confirm</MDBBtn>
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
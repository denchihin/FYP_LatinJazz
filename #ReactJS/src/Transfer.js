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

function Transfer() {
    const [email, setEmail] = useState("");
    const [trfStatus, setTrfStatus] = useState(false);
    const [targetAds, setTargetAds] = useState("");
    const [barcode, setBarcode] = useState("");
    const [artName, setArtName] = useState("");
    const [serialNum, setSerialNum] = useState("");
    const [cost, setCost] = useState("");

    const {contract} = useWeb3(); //connection to the Blockchain smart contract
    
    const navigate = useNavigate(); //define page navigation 

    const [centredModal, setCentredModal] = useState(false); //MDB popup define
    const toggleShow = () => setCentredModal(!centredModal);

    function refreshPage() {
      window.location.reload(false);
    }

    const onConnect = async (e) => {
      e.preventDefault();
        let provider = window.ethereum;
        if (typeof provider !== "undefined") {
          await provider.request({ method: "eth_requestAccounts" });
          const web3 = new Web3(provider);
          const accounts = await web3.eth.getAccounts();
          const account = accounts[0];
        
          const receipt = await contract.methods.newOwner(account, targetAds, barcode).send({ from: account});
          const status = receipt.status;
          console.log( status );
          if (status == true ){
            toggleShow();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Artwotk has been transfered',
              showConfirmButton: false,
              timer: 3500
            })
          }else{
            toggleShow();
            console.log("Artwork transfer fail, please check Barcode or Owner addres")
          }
        console.log(account, targetAds , barcode)
        } else {
          console.log("Non-ethereum browser detected.Please install Metamask");
        }
        refreshPage();
      };

    const onConfirm = async (e) =>{
      e.preventDefault();
      const theArtwork = await contract.methods.getArtwork(barcode).call()
      let artName = (theArtwork.artworkName);
      let snNum = (theArtwork.serialNumber);
      let costNum = (theArtwork.cost);
      setArtName(artName);
      setSerialNum(snNum);
      setCost(costNum);
      const theParticipant = await contract.methods.getParticipant(targetAds).call()
      let nameP = (theParticipant.userName);
      setEmail(nameP);
      toggleShow();
    }

return(

<form onSubmit={onConfirm}>
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
          <span className="h2 fw-bold mb-0">Transfer Artwork</span>
        </div>

        <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Transfer Artowkrs in ArtistryTrack</h5>

          <MDBInput wrapperClass='mb-4' required label='Barcode' id='barcode' type='text' size="lg" value={barcode} onChange={(e)=> setBarcode(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' required label='New Owner' id='ownerName' type='text'  size="lg" value={targetAds} onChange={(e)=> setTargetAds(e.target.value)}/>

        <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Confirm Transfer</MDBBtn>

        <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
            <MDBModalDialog centered>
            <MDBModalContent>
                <MDBModalHeader>
                <MDBModalTitle>Artwork Transfer</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                <h4 className="fw-normal pb-3 text-start">BarCode: {barcode}</h4>
                <h4 className="fw-bolder pb-3 text-start">Artwork Name: {artName}</h4>
                <h5 className="fw-normal pb-3 text-start">Serial Number: {serialNum}</h5>
                <h5 className="fw-normal pb-3 text-start">cost: {cost}</h5>
                <h4 className="fw-bolder pb-3 text-start">Transfer to :{email}</h4>
                </MDBModalBody>
                <MDBModalFooter>
                <MDBBtn  className="mb-4 px-5" color='secondary' size='lg'> Close </MDBBtn>
                <MDBBtn onClick={onConnect} className="mb-4 px-5" color='dark' size='lg' >Confirm Transfer</MDBBtn>
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

export default Transfer;
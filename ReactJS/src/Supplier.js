import Signin from "./Signin";
import App from "./App";
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

function Supplier() {

        // const [artwork, setArtwork] = useState("");
        // const [barcode, setBarcode] = useState("");
        // const [artName, setArtName] = useState("");
        // const [serialNum, setSerialNum] = useState("");
        // const [cost, setCost] = useState("");
    
        const {contract} = useWeb3(); //connection to the Blockchain smart contract
        
        const navigate = useNavigate(); //define page navigation 
    
        // const [centredModal, setCentredModal] = useState(false); //MDB popup define
        // const toggleShow = () => setCentredModal(!centredModal);
    
        // const onConnect = async (e) => {
        //   e.preventDefault();
        //     let provider = window.ethereum;
        //     if (typeof provider !== "undefined") {
        //       await provider.request({ method: "eth_requestAccounts" });
        //       const web3 = new Web3(provider);
        //       const accounts = await web3.eth.getAccounts();
        //       const account = accounts[0];
              
        //       await contract.methods.addArtwork(account, barcode , artName , serialNum , cost).send({ from: account});
        //       const theArtwork = await contract.methods.getArtwork(barcode).call();
        //       let nameArt = theArtwork.artworksName
        //       setArtwork(theArtwork.artworkName);
        //       console.log(artwork , theArtwork.artworkName);
        //       console.log(artwork , theArtwork.barcode);
        //       navigate("/Manufacturer");
      
        //     } else {
        //       console.log("Non-ethereum browser detected.Please install Metamask");
        //     }
        //   };
    
            // const onConfirm = async (e) =>{
            // e.preventDefault();
            // toggleShow();
            // }
    
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
            const onAccSearch = async (e) =>{
            navigate("/CheckAC");
            }
    
    return(
    
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
    
            <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Welcome to ArtistryTrack</h5>
            <MDBBtn onClick={onArtSearch} className="mb-4 px-5" color='dark' size='lg'>Search Artowrk</MDBBtn>
            <MDBBtn onClick={onTrack} className="mb-4 px-5" color='dark' size='lg'>Tracker</MDBBtn>
            <MDBBtn onClick={onTransfer} className="mb-4 px-5" color='dark' size='lg'>Transfer</MDBBtn>
            <MDBBtn onClick={onAccSearch} className="mb-4 px-5" color='dark' size='lg'>Check Account</MDBBtn>
            <MDBBtn onClick={onQuit} className="mb-4 px-4" color='white' size='lg'>Log out</MDBBtn>
    

          </MDBCardBody>
        </MDBCol>
    
      </MDBRow>
    </MDBCard>
    
    </MDBContainer>
        );
    
    }
    export default Supplier;
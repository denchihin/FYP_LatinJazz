import {useState} from "react";
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


function Checkartwork() {

    const [barcode, setBarcode] = useState("");
    const [artName, setArtName] = useState("");
    const [serialNum, setSerialNum] = useState("");
    const [artId, setArtId] = useState("");
    const [cost, setCost] = useState("");
    const [ownerAds, setOwnerAds] = useState("");
    const [atyTime, setAtyTime] = useState("");
    const [artGene, setArtGene] = useState("");

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
          const theArtwork = await contract.methods.getArtwork(barcode).call()
          let artName = (theArtwork.artworkName);
          let snNum = (theArtwork.serialNumber);
          let artId =(theArtwork.artworkId);
          let costNum = (theArtwork.cost);
          let ownerAds =(theArtwork.artworkOwner);
          let timeStp = (theArtwork.atyTimeStamp);
          let artGene =(theArtwork.partGene);
            setArtName(artName);
            setSerialNum(snNum);
            setArtId(artId);
            setCost(costNum);
            setOwnerAds(ownerAds);
            setAtyTime(timeStp);
            setArtGene(artGene);
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
      <MDBCardImage src='https://media.vogue.com.tw/photos/5f1164b828ba162251185fd2/master/w_1600%2Cc_limit/SAINT%2520LAURENT_FALL20_03_HR.jpg' alt="login form" className='rounded-start w-100'/>
    </MDBCol>

    <MDBCol md='6'>
      <MDBCardBody className='d-flex flex-column'>

        <div className='d-flex flex-row mt-2'>
          <MDBIcon fas icon="crop-alt fa-2x me-3" style={{ color: '#d63384' }}/>
          <span className="h2 fw-bold mb-0">ArtistryTracker</span>
        </div>

        <h5 className="fw-normal my-4 pb-1" style={{letterSpacing: '1px'}}>Check your Artwork information</h5>

        { isPending && <h4 className="fw-bolder text-start" style={{letterSpacing: '1px'}}>Artwork Name</h4>}
        { isPending && <h5 className="fw-normal pb-3 text-start" style={{letterSpacing: '1px'}}>{artName}</h5>}
        
        { isPending && <h4 className="fw-bolder text-start" style={{letterSpacing: '1px'}}>Serial number</h4>}
        { isPending && <h5 className="fw-normal pb-3 text-start" style={{letterSpacing: '1px'}}>{serialNum}</h5>}

        { isPending && <h5 className="fw-bolder text-start" style={{letterSpacing: '1px'}}>Cost</h5>}
        { isPending && <p className="fw-normal pb-1 text-start" style={{letterSpacing: '1px'}}>{cost}</p>}
        
        { isPending && <h5 className="fw-bolder text-start" style={{letterSpacing: '1px'}}>Owner Address</h5>}
        { isPending && <p className="fw-normal pb-1 text-start" style={{letterSpacing: '1px'}}>{ownerAds}</p>}

        { isPending && <h5 className="fw-bolder text-start" style={{letterSpacing: '1px'}}>Create Time</h5>}
        { isPending && <p className="fw-normal pb-1 text-start" style={{letterSpacing: '1px'}}>{atyTime}</p>}
        
        { isPending && <h6 className="fw-bolder text-start" style={{letterSpacing: '1px'}}>Artwork ID</h6>}
        { isPending && <p className="fw-normal  text-start" style={{letterSpacing: '1px'}}>{artId}</p>}

        { isPending && <h6 className="fw-bolder text-start" style={{letterSpacing: '1px'}}>Artwork Gene</h6>}
        { isPending && <p className="fw-normal text-start" style={{letterSpacing: '1px'}}>{artGene}</p>}


        <MDBInput wrapperClass='mb-4' required label='Barcode' id='barcodeChk' type='number' size="lg" value={barcode} onChange={(e)=> setBarcode(e.target.value)}/>
        <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Submit</MDBBtn>

      </MDBCardBody>
    </MDBCol>

  </MDBRow>
</MDBCard>

</MDBContainer>
</form>
    );

}

export default Checkartwork;
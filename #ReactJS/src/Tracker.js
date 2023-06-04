import {useState} from "react";
import './index.css';
import Web3 from 'web3';
import useWeb3 from "./useWeb3";
import Tracklist from "./Tracklist";
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";

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


function Tracker() {

    function refreshPage() {
        window.location.reload(false);
      }
    
    const [barcode, setBarcode] = useState("");

    const {contract} = useWeb3(); //connection to the Blockchain smart contract

    const { data: trackers, isPending, error } = useFetch('http://localhost:8000/trackers')

    const natvigate = useNavigate();
    
    const handleReset = () => {
        console.log(Object.keys(trackers).length)

        for(let b=1; b <= Object.keys(trackers).length ; b++){
        fetch('http://localhost:8000/trackers/' + b, {
            method: 'DELETE'
          })
          .then(() => { console.log ("roll number", b ,"has been deleted ");
          }) 
        }
        natvigate('/Manufacturer');
    }
    
    const onConnect = async (e) => {
        e.preventDefault();

        let provider = window.ethereum;
        if (typeof provider !== "undefined") {
          await provider.request({ method: "eth_requestAccounts" });
          const web3 = new Web3(provider);
          const accounts = await web3.eth.getAccounts();
          const account = accounts[0];
            const theArtwork = await contract.methods.getProvenance(barcode).call()
            let ownerList = (theArtwork);
            var loopData = ''
            var i ;
          for(i=0; i < ownerList.length; i++){
              loopData = `${ownerList[i]}`
              const history = await contract.methods.getOwnership(loopData).call()
              let getAddress = (history.ownerAddress);
              let getArtworkid = (history.artworkId);
              let currentTimestamp = (history.trdTimeStamp);
              let newTimeStp = (currentTimestamp * 1000);
              let trdtime = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(newTimeStp)
              const ownership = await contract.methods.getParticipant(getAddress).call()
              let owner = (ownership.userName);
              let ownertype = (ownership.participantType)
              const artName = await contract.methods.getArtwork(getArtworkid).call()
              let artTitle = (artName.artworkName);
              let cost = (artName.cost);

            // Adding return data to a JSON file
                const blog = { owner , artTitle, ownertype , trdtime, cost };
                fetch('http://localhost:8000/trackers/', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(blog)
                    }).then(() => {
                    console.log('new blog added');
                    })
          }
          refreshPage();
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
      <MDBCardImage src='https://static.zoomnews.com/photo/92725733/92725733.jpg' alt="login form" className='rounded-start w-100'/>
    </MDBCol>

    <MDBCol md='6'>
      <MDBCardBody className='d-flex flex-column'>

        <div className='d-flex flex-row mt-2'>
          <MDBIcon fas icon="crop-alt fa-2x me-3" style={{ color: '#d63384' }}/>
          <span className="h2 fw-bold mb-0">ArtistryTracker</span>
        </div>

        <h5 className="fw-normal my-4 pb-1" style={{letterSpacing: '1px'}}  >Transaction History</h5>
        
        <div className="Home">
            {error && <div> {error} </div>}
            {isPending && <div>Scan artwork barcode... </div>  }
            {trackers && < Tracklist trackers={trackers}/> } 
        </div>


        <MDBInput wrapperClass='mb-4' required label='Barcode' id='barcodeChk' type='text' size="lg" value={barcode} onChange={(e)=> setBarcode(e.target.value)}/>
        <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Submit</MDBBtn>
        
        <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleReset}>Return to Manu</MDBBtn>

      </MDBCardBody>
    </MDBCol>

  </MDBRow>
</MDBCard>

</MDBContainer>
</form>
    );

}

export default Tracker;
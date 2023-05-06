import './App.css';
import Web3 from 'web3';
import configuration from './contracts/artistryTrack.json';
import { useState } from "react";


function Home() {

  const onConnect = async () => {
    let provider = window.ethereum;
    if (typeof provider !== "undefined") {
      await provider.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      // await contract.methods.addParticipant("Royal ArtCentre","passA", account ,"Manufacturer").send({ from: account});
      // const theParticipant = await contract.methods.getParticipant(0).call();
      // setNewParticipant(theParticipant);
      // console.log(theParticipant);
    } else {
      console.log("Non-ethereum browser detected.Please install Metamask");
    }
  };
  
  const contractAddress = configuration.networks["5777"].address;
  const contractABI = configuration.abi;
  const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  return (
    <div className="App">
      <button onClick={onConnect}>Connect to metamask</button>
    </div>
  );
}

export default Home;

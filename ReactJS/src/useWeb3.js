import configuration from './contracts/artistryTrack.json';
import Web3 from 'web3';

const useWeb3 =()=>{

const contractAddress = configuration.networks["5777"].address;
const contractABI = configuration.abi;
const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
const contract = new web3.eth.Contract(contractABI, contractAddress);

return { contract };
}

export default useWeb3;
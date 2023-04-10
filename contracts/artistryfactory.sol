//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ownable.sol";
import "./safemath.sol";

contract ArtistryFactory is Ownable {

using SafeMath for uint256;

event NewArtwork(uint artworkId, string name, uint gene);
uint geneDigits = 16;
uint geneModulus = 10 ** geneDigits;
     
struct Artwork {
    string name;
    uint gene;
    uint32 createDate;
    }

Artwork[] public artworks;

mapping (uint => address) public artworkToOwner;
mapping (address => uint) ownerArtworkCount;

function _createArtwork(string memory _name, uint _gene) internal {
    artworks.push(Artwork (_name, _gene, uint32 (block.timestamp)));
    uint id = artworks.length -1;
    artworkToOwner[id] = msg.sender;
    ownerArtworkCount[msg.sender] = ownerArtworkCount[msg.sender].add(1);
    emit NewArtwork (id, _name, _gene);   
}

function _generateRandomGene(string memory _str) private view returns (uint){
    uint rand = uint(keccak256(abi.encodePacked(_str)));
    return rand % geneModulus;
}

function _createNewArtwork(string memory _name) public{
    require(ownerArtworkCount[msg.sender] == 0);
    uint randGene = _generateRandomGene(_name);
    randGene = randGene - randGene % 100;
    _createArtwork (_name, randGene);
}


}
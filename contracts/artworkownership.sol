//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./safemath.sol";
import "./artistryfactory.sol";
import "./erc721.sol";

contract ArtworkOwnership is ArtistryFactory{

event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);

using SafeMath for uint256;

mapping (uint => address) artworksApprovals;

function balanceOf(address _owner) external view returns (uint256) {
    return ownerArtworkCount[_owner];
  }

function ownerOf(uint256 _tokenId) external view returns (address) {
    return artworkToOwner[_tokenId];
  }

function _transfer(address _from, address _to, uint256 _tokenId) private {
    ownerArtworkCount[_to] = ownerArtworkCount[_to].add(1);
    ownerArtworkCount[msg.sender] = ownerArtworkCount[msg.sender].sub(1);
    artworkToOwner[_tokenId] = _to;
    emit Transfer(_from, _to, _tokenId);
  }

function transferFrom(address _from, address _to, uint256 _tokenId) external payable {
    require (artworkToOwner[_tokenId] == msg.sender || artworksApprovals[_tokenId] == msg.sender);
    _transfer(_from, _to, _tokenId);
  }

  function approve(address _approved, uint256 _tokenId) external payable onlyOwnerOf(_tokenId) {
    artworksApprovals[_tokenId] = _approved;
    emit Approval(msg.sender, _approved, _tokenId);
  }

}
# This the React App source file

## root starting page / config to Signin.js every user must signup to use the smart contracts function

## Home Page / 
This is the main Entrance that allow user to login there metal mask and system account, browser is required to install metamask plugin

## Manufacturer | Supplier 
Manufacturer allow to create a new Artwork, search Artwork by Barcode/ NFC , Transfer and track the Artwork. only Manufacturer allow to create new Supplier account. Manufacturer.js and Supplier.js contain the interface and via the web3js libraries to call the smart contracts function.

## CheckAW, Tracker, CheckAC 
These JS functions are used to call the Smart Contracts function via the web3js to get the block information from the smart contracts, those are no gas cost to check the block information.

## Transfer
This page allow calling the newOwner function in Smart Contract to transfer the Artwork to a new owner address(Cryto wallet), it have a mechanism in the smart contract to verifty the transfer fulfill the criteria.  

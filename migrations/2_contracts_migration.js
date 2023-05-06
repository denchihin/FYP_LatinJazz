const ArtistryFactory = artifacts.require("./artistryfactory.sol");
const ArtworkOwnership = artifacts.require("./artworkownership.sol");
const artistryChain = artifacts.require("./artistryChain.sol");
const artistryTrack = artifacts.require("./artistryTrack.sol");
module.exports = function(deployer) {
    deployer.deploy(ArtistryFactory);
    deployer.deploy(ArtworkOwnership);
    deployer.deploy(artistryChain);
    deployer.deploy(artistryTrack);
};
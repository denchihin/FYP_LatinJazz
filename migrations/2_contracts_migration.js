const ArtistryFactory = artifacts.require("./artistryfactory.sol");
const ArtworkOwnership = artifacts.require("./artworkownership.sol");
module.exports = function(deployer) {
    deployer.deploy(ArtistryFactory);
    deployer.deploy(ArtworkOwnership);
};
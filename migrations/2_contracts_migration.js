const ArtistryFactory = artifacts.require("./artistryfactory.sol");
module.exports = function(deployer) {
    deployer.deploy(ArtistryFactory);
};
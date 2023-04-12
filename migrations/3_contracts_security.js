const SafeMath = artifacts.require("./safemath.sol");
module.exports = function(deployer) {
    deployer.deploy(SafeMath);
};
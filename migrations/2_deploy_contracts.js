var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var MedicalReport = artifacts.require("./MedicalReport.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(MedicalReport);
};

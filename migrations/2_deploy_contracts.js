var Fcontracts = artifacts.require('Fcontracts')

module.exports = function (deployer, network, accounts) {
  deployer.deploy(Fcontracts)
}

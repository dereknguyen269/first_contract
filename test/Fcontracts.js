// web3 is a global variable, injected by Truffle.js
const BigNumber = web3.BigNumber

// artifacts is a global variable, injected by Truffle.js
const Fcontracts = artifacts.require("./Fcontracts.sol")

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should()

contract('Fcontracts', function(walletAddresses) {
  let me = walletAddresses[0]
  let contract

  beforeEach(async function () {
    contract = await Fcontracts.new()
  })

  it('should create contract', async function () {
    contract.should.exist

    const fcontracts = await contract.getFcontracts(me)
    fcontracts.should.be.bignumber.equal(new BigNumber(0))
  })

  it('should updateFcontracts and getFcontracts correctly', async function () {
    // initially i have 0 shares
    let fcontracts = await contract.getFcontracts(me)
    fcontracts.should.be.bignumber.equal(new BigNumber(0))

    await contract.updateFcontracts(1, { from: me })

    fcontracts = await contract.getFcontracts(me)
    fcontracts.should.be.bignumber.equal(new BigNumber(1))
  })

})

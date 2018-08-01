// if (typeof web3 !== 'undefined') {
// Using for testnet or mainnet
//   web3Provider = web3.currentProvider;
// } else {
//   web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
// }
// Just for locally
web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
var web3 = new Web3(web3Provider);

$.getJSON('js/Fcontracts.json', function(data) {
}).then(response => {
  var abi = response.abi;
  initFcontracts(abi)
});

var FContract;
var contractAddress = '0x726ADAef226F024F89Ed376309F6bA56a654C8Ee'
var instance;
var buyerAddress = '0x6713be6f7e3fb5ec0d0fa4e75d059afb6e7c0fda'

function initFcontracts(abi) {
  FContract = web3.eth.contract(abi);
  instance = FContract.at(contractAddress);
  instance.getFcontracts(buyerAddress, function (err, res) {
    $('#numContracts').text(res.toString())
  })
}

function buy() {
  instance.updateFcontracts(1, { from: buyerAddress }, function (err, res) {
    console.log('txn', 'https://rinkeby.etherscan.io/tx/' + res)
    reloadNumContracts();
  })
}

function reloadNumContracts(){
  instance.getFcontracts(buyerAddress, function (err, res) {
    $('#numContracts').text(res.toString())
  })
}
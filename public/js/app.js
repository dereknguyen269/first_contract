// Using for testnet or mainnet
if (typeof web3 !== 'undefined') {
  web3Provider = web3.currentProvider;
} else {
  web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
// Just for locally
// web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
var web3 = new Web3(web3Provider);

$.getJSON('js/Fcontracts.json', function(data) {
}).then(response => {
  var abi = response.abi;
  initFcontracts(abi);
});
var accounts;
var FContract;
var contractAddress = '0x3055aaB2955ed6876B5779795BC26f78755A7129' // https://ropsten.etherscan.io/address/0x3055aab2955ed6876b5779795bc26f78755a7129
var instance;
var buyerAddress;

web3.eth.getAccountsPromise = function () {
    return new Promise(function (resolve, reject) {
        web3.eth.getAccounts(function (e, accounts) {
            if (e != null) {
                reject(e);
            } else {
                resolve(accounts);
            }
        });
    });
};

web3.eth.getAccountsPromise().then(function(res){
  accounts = res;
});

function initFcontracts(abi) {
  web3.eth.getAccountsPromise().then(function(res){
    accounts = res;
    buyerAddress = accounts[0];
    FContract = web3.eth.contract(abi);
    instance = FContract.at(contractAddress);
    instance.getFcontracts(buyerAddress, function (err, res) {
      $('#numContracts').text(res.toString())
    })
  });
}

function buy() {
  instance.updateFcontracts(1, { from: buyerAddress }, function (err, res) {
    console.log('txn', 'https://ropsten.etherscan.io/tx/' + res)
  });
}

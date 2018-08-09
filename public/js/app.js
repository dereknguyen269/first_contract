App = {
  web3Provider: null,
  web3: null,
  accounts: [],
  instance: null,
  FContract: null,
  buyerAddress: null,
  contractAddress: $('body').data('contract-address'),

  init: function () {
    return App.initWeb3();
  },

  initWeb3: function () {
    if (typeof web3 !== 'undefined') {
      web3Provider = web3.currentProvider;
    } else {
      web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    App.web3 = new Web3(web3Provider);
    App.web3.eth.getAccountsPromise = function () {
        return new Promise(function (resolve, reject) {
            App.web3.eth.getAccounts(function (e, accounts) {
                if (e != null) {
                    reject(e);
                } else {
                    resolve(accounts);
                }
            });
        });
    };
    return App.initContract();
  },

  initContract: function () {
    $.getJSON('js/Fcontracts.json', function (data) {
      abiData = data.abi;
      App.web3.eth.getAccountsPromise().then(function(res){
        App.accounts = res;
        App.buyerAddress = App.accounts[0];
        App.FContract = App.web3.eth.contract(abiData);
        App.instance = App.FContract.at(App.contractAddress);
        App.instance.getFcontracts(App.buyerAddress, function (err, res) {
          $('#numContracts').text(res.toString())
        });
      });
    });
  },

  callAction: function () {
    App.instance.updateFcontracts(1, { from: App.buyerAddress }, function (err, res) {
      console.log('Call Action has been successfully \n');
      console.log('txn', 'https://ropsten.etherscan.io/tx/' + res)
    });
  }
}

$(function () {
  $( document ).ready(function() {
    App.init();
  });
});



const{Blockchain,Transaction}=require('./blockdemo');
const EC=require('elliptic').ec;
const  ec=new EC('secp256k1');
const myKey=ec.keyFromPrivate('4f9985ec6c2ce756177cca6ddb3e7aea34a07b360ca0c856cad6fe7bb87ac940');
const myWalletAddress=myKey.getPublic('hex');

let sajeevCoin=new Blockchain();
const tx1=new Transaction(myWalletAddress,'public key goes here',10);
tx1.signTransaction(myKey);
sajeevCoin.addTransaction(tx1);
//sajeevCoin.createTransaction(new Transaction('address1','address2',100));
//sajeevCoin.createTransaction(new Transaction('address2','address1',50));
console.log('\n Starting the miner...');
sajeevCoin.minePendingTransactions(myWalletAddress);
console.log('\n Balance of Subhita is',sajeevCoin.getBalanceofAddress(myWalletAddress));
//console.log('\n Starting the miner again ...');
//sajeevCoin.minePendingTransactions('xaviers-address');
//console.log('\n Balance of Subhita is',sajeevCoin.getBalanceofAddress('xaviers-address'));

//sajeevCoin.chain[1].transactions[0].amount=1;
console.log('Is chain Valid?',sajeevCoin.isChainValid());

/*console.log('Mining Block1....');
sajeevCoin.addBlock(new Block(1,"20/07/2017",{amount:4}));
console.log('Mining B
lock2....');
sajeevCoin.addBlock(new Block(2,"20/07/2017",{amount:8}));
*/
//console.log('IS Blockchainvalid ?'+sajeevCoin.isChainValid());
//console.log(JSON.stringify(sajeevCoin,null,4));


//sajeevCoin.chain[1].data= {amount:100};
//sajeevCoin.chain[1].hash=sajeevCoin.chain[1].calculateHash();
//console.log('IS Blockchainvalid ?'+sajeevCoin.isChainValid());


const SHA256 = require('crypto-js/sha256');
class Transaction
{
    constructor(fromAddress,toAddress,amount)
    {
        this.fromAddress=fromAddress;
        this.toAddress=toAddress;
        this.amount=amount;
    }
}
    class Block
{
    constructor(timestamp,transaction,previousHash='')
{
    
    this.timestamp=timestamp;
    this.transaction=transaction;
    this.previousHash=previousHash;
    this.hash=this.calculateHash();
    this.nonce=0;
}
calculateHash()
{
return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)+this.nonce).toString();

}
mineBlock(difficulty)
{
   while( this.hash.substring(0,difficulty)!=Array(difficulty+1).join("0"))
    {
        this.nonce++;
        this.hash=this.calculateHash();
    }
    console.log("block mined :"+this.hash);
}
}
class Blockchain  
{
    constructor()
    {
        this.chain=[this.createGenesisBlock()];
        this.difficulty=2;
        this.pendingTransactions=[];
        this.miningReward=100;

    }
    createGenesisBlock()
    {
        return new Block("01/01/2017","Genesis Blcok","0");
    }
    getLatestBlock()
    {
        return this.chain[this.chain.length-1];
    }
   /* addBlock(newBlock)
    {
            newBlock.previousHash=this.getLatestBlock().hash;
            newBlock.mineBlock(this.difficulty);
          //  newBlock.hash=newBlock.calculateHash();
            this.chain.push(newBlock);
    }*/
    minePendingTransactions(miningRewardAddress)
    {
        let block=new Block(Date.now(),this.pendingTransactions);
        block.mineBlock(this.difficulty);
        console.log('Block Successfully mined');
        this.chain.push(block);
        this.pendingTransactions=[new Transaction(null,miningRewardAddress,this.miningReward)]; 
    }
    createTransaction(transaction)
    {
        this.pendingTransactions.push(transaction);
    }
    getBalanceofAddress(address)
    {
        let balance=0;
        for(const block of this.chain)
        {
            for(const trans of block.transaction)
            {
                if(trans.fromAddress==address)
                {
                    balance-=trans.amount;
                }
                if(trans.toAddress==address)
                {
                    balance+=trans.amount;
                }
            }

              
        }
        return balance;
    }
    isChainValid()
    {
        for(let i=1;i<this.chain.length;i++)
        {
            const currentBlock=this.chain[i];
            const previousBlock=this.chain[i-1];
            if(currentBlock.hash!=currentBlock.calculateHash())
            {
                return false;
            }
            if(currentBlock.previousHash!=previousBlock.hash)
            {
                return false;
            }
        }
        return true;
    }
}
let sajeevCoin=new Blockchain();
sajeevCoin.createTransaction(new Transaction('address1','address2',100));
sajeevCoin.createTransaction(new Transaction('address2','address1',50));
console.log('\n Starting the miner...');
sajeevCoin.minePendingTransactions('xaviers-address');
console.log('\n Balance of Subhita is',sajeevCoin.getBalanceofAddress('xaviers-address'));
console.log('\n Starting the miner again ...');
sajeevCoin.minePendingTransactions('xaviers-address');
console.log('\n Balance of Subhita is',sajeevCoin.getBalanceofAddress('xaviers-address'));




/*console.log('Mining Block1....');
sajeevCoin.addBlock(new Block(1,"20/07/2017",{amount:4}));
console.log('Mining Block2....');
sajeevCoin.addBlock(new Block(2,"20/07/2017",{amount:8}));
*/
//console.log('IS Blockchainvalid ?'+sajeevCoin.isChainValid());
//console.log(JSON.stringify(sajeevCoin,null,4));


//sajeevCoin.chain[1].data= {amount:100};
//sajeevCoin.chain[1].hash=sajeevCoin.chain[1].calculateHash();
//console.log('IS Blockchainvalid ?'+sajeevCoin.isChainValid());


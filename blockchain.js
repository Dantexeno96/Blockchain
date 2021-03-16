const Block = require("./block");
const cryptoHash = require("./crypto-hash");

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({ data }) {
        const newBlock = Block.mineBlock({
           lastBlock: this.chain[this.chain.length-1],
           data 
        });

        this.chain.push(newBlock);
    }

    replaceChain(chain) {
        if(chain.length <= this.chain.length) {
            console.error('Incoming chain must be longer');
            return;
        }

        if(!Blockchain.isValidChain(chain)) {
            console.error('Incoming chain must be valid');
            return;
        }

        this.chain = chain;
    }

    static isValidChain(chain) {
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
        
        for (let index = 1; index < chain.length; index++) {
            const { timestamp, lastHash, hash, nonce, difficulty, data } = chain[index];
            const actualLastHash = chain[index-1].hash;
            const lastDifficulty = chain[index-1].difficulty;

            if(lastHash !== actualLastHash) return false;

            const validatedHash = cryptoHash(timestamp, lastHash, nonce, difficulty, data);

            if(hash !== validatedHash) return false;

            if((lastDifficulty - difficulty) > 1) return false;
        }
        
        return true;
    };
}

module.exports = Blockchain;
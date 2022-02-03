const compiler = require("simple-solc");
const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

const provider = new HDWalletProvider(
  "witness trust essay law mesh later sniff flock lawsuit victory decorate color",
  "https://rinkeby.infura.io/v3/032b6ad6170e4a0b986320fa08db9c6a"
);

const web3 = new Web3(provider);

async function main() {
  const [accountsID] = await web3.eth.getAccounts();
  console.log({ accountsID });

  const { bytecode, abi } = compiler(
    "Inbox",
    __dirname + "/contracts/Inbox.sol"
  );
  try {
    const inbox = await new web3.eth.Contract(abi)
      .deploy({
        data: bytecode,
        arguments: ["hello world"],
      })
      .send({
        from: accountsID,
        gas: "1000000",
      });
    console.log(inbox.options.address);
  } catch (error) {
    console.log(error.message);
  }
}

main();

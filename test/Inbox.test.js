const assert = require("assert");
const compile = require("simple-solc");
const Web3 = require("web3");
const web3 = new Web3("HTTP://127.0.0.1:7545");

let accounts;
let inbox;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  const { bytecode, abi } = compile("Inbox", "contracts/Inbox.sol");
  // console.log(bytecode);
  // console.log(abi);
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
      arguments: ["hi there"],
    })
    .send({ from: accounts[0], gas: "1000000" });
  // console.log(inbox);
  // console.log(inbox);
});

// it("demo",()=>{

// })
describe("Inbox", () => {
  it("Inbox contract deployed", () => {
    assert.ok(inbox.options.address);
  });

  it("has a initial massage", async () => {
    const massage = await inbox.methods.firstMsg().call();
    assert.equal(massage, "hi there");
    // console.log(massage);
  });

  it("can change message", async () => {
    await inbox.methods.setMsg("new massage..").send({ from: accounts[0] });
    const massage = await inbox.methods.firstMsg().call();
    assert.equal(massage, "new massage..");
  });
});

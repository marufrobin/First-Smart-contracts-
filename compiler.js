const fileSys = require("fs");
const path = require("path");
const solc = require("solc");

const compile = (contractName, sourceFile) => {
  const location = path.resolve(__dirname, `contracts/${sourceFile}`);
  const source = fileSys.readFileSync(location, "utf-8");
  const input = {
    language: "Solidity",
    sources: {
      [sourceFile]: {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };
  const output = solc.compile(JSON.stringify(input));

  const abi = JSON.parse(output).contracts[sourceFile].Inbox.abi;

  const byteCode =
    JSON.parse(output).contracts[sourceFile].Inbox.evm.bytecode.object;
  // console.log(byteCode);
  return {
    abi: abi,
    byteCode: byteCode,
  };
};

module.exports = compile;
import Constants from "./Constants.interface";

// please, as the name implies, keep this a dumb JSON object (but at least now we can annotate with comments 🥹)
const constants: Constants = {
  supportedChains: [
    // chain ids taken from: https://chainlist.org/
    // NOTE: first one will be selected by default
    {
      name: "Ethereum Mainnet",
      chainId: 1,
    },
    {
      name: "Polygon Mainnet",
      chainId: 137,
    },
    {
      name: "Gnosis Mainnet",
      chainId: 100,
    },
    {
      name: "zkSync", // v2
      chainId: 324,
    },
  ],
};

export default constants;

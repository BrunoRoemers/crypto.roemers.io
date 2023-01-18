import constants from "../constants/constants";

const isSupportedChainId = (chainId: number): boolean =>
  constants.supportedChains.find((c) => c.chainId === chainId) !== undefined;

export default isSupportedChainId;

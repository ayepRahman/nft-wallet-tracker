// This script demonstrates access to the NFT API via the Alchemy SDK.
import { Alchemy, Network } from "alchemy-sdk";
import { ALCHEMY_KEY } from "./constants";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: ALCHEMY_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

export const alchemy = new Alchemy(settings);

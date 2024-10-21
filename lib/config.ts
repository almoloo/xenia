import { cookieStorage, createStorage, http } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { defineChain } from "@reown/appkit/networks";

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID;

if (!projectId) {
  throw new Error("Project ID is not defined");
}

const aiaTestnet = defineChain({
  id: 1320,
  name: "AIA Testnet",
  caipNetworkId: "eip155:0x528",
  chainNamespace: "eip155",
  assets: {
    imageUrl: "https://www.aiascan.com/static/icon.png",
    imageId: "aia",
  },
  nativeCurrency: {
    name: "AIA",
    symbol: "AIA",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://aia-dataseed1-testnet.aiachain.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "AIA Explorer",
      url: "https://testnet.aiascan.com",
    },
  },
});

export const networks = [aiaTestnet];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;

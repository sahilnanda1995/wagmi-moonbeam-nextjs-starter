import React from "react";

import { AppProps } from "next/app";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  polygonMumbai,
  arbitrumGoerli,
  optimismGoerli,
  arbitrum,
  goerli,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import "../styles/tailwind.scss";
// import { moonbase, moonbeam, moonriver } from "../networksInfo";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    polygonMumbai,
    arbitrumGoerli,
    goerli,
    optimismGoerli,
    arbitrum,
  ],
  [publicProvider()]
);

const client = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <WagmiConfig config={client}>
      <div className="bg-slate-900">
        <Component {...pageProps} />
      </div>
      {/* <Analytics /> */}
    </WagmiConfig>
  );
}

export default MyApp;

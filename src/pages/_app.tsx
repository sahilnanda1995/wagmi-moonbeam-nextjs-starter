import React from "react";

import { AppProps } from "next/app";
import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import "../styles/tailwind.scss";
import { moonbase, moonbeam, moonriver } from "../networksInfo";

const { provider, webSocketProvider } = configureChains(
  [moonbase, moonbeam, moonriver, mainnet],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}

export default MyApp;

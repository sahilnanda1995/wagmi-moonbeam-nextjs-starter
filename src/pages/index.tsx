import React, { useEffect, useState } from "react";

import Head from "next/head";
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import { moonbase, moonbeam, moonriver } from "../networksInfo";

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const { chain } = useNetwork();
  const { isConnected } = useAccount();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // for fixing hydration failed error
  if (!hasMounted) {
    return null;
  }

  return (
    <div>
      <Head>
        <title>Wagmi Moonbeam Next.js Template</title>

        <meta
          name="Wagmi Moonbeam Next.js Template"
          content="Wagmi Moonbeam Next.js Template"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen justify-center bg-gradient-to-b from-gray-50 via-gray-50 to-gray-100 py-20">
        <div className="flex-col space-y-4 text-center">
          <h1 className="text-center text-4xl font-bold sm:mt-4 sm:text-6xl">
            Wagmi
            <br />
            Moonbeam Ecosystem <br />
            Next.js Starter
          </h1>
          <ConnectWallet />
          {isConnected && (
            <div className="flex flex-col space-y-4">
              {chain.id != moonbase.id && <SwitchTo toChain={moonbase} />}
              {chain.id != moonriver.id && <SwitchTo toChain={moonriver} />}
              {chain.id != moonbeam.id && <SwitchTo toChain={moonbeam} />}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  return isConnected && chain ? (
    <div>
      <p>Connected to {chain.name}</p>
      <p>Connected Address: {address}</p>
    </div>
  ) : (
    <button
      className="rounded-md border p-2 hover:bg-gray-100"
      onClick={() => connect()}
    >
      Connect Wallet
    </button>
  );
}

function SwitchTo({ toChain }) {
  const { isError, error, switchNetwork } = useSwitchNetwork();

  return isError && error?.name === "ChainNotConfigured" ? (
    <button
      className="rounded-md border p-2 hover:bg-gray-100"
      onClick={() =>
        window.open(
          `https://chainlist.org/chain/${toChain.id}`,
          "_blank",
          "noopener,noreferrer"
        )
      }
    >
      Add network to Metamask
    </button>
  ) : (
    <button
      className="rounded-md border p-2 hover:bg-gray-100"
      onClick={() => switchNetwork(toChain.id)}
    >
      Switch to {toChain.name}
    </button>
  );
}

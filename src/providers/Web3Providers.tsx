import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { aeneid } from "@story-protocol/core-sdk";
import StoryProvider from "../context/StoryContext";

const config = getDefaultConfig({
  appName: "Scent Protocol",
  projectId: process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID as string,
  chains: [aeneid],
  ssr: false,
});

const queryClient = new QueryClient();

export default function Web3Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <StoryProvider>{children}</StoryProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
} 
import { StoryClient, aeneid } from "@story-protocol/core-sdk";
import { custom } from "viem";

// Story Protocol의 테스트넷 정보
export const networkInfo = {
  name: "Aeneid Testnet",
  chainId: "aeneid",
  protocolExplorer: "https://aeneid.explorer.story.foundation"
};

// SPG NFT Contract Address (Story Protocol Genesis NFT)
export const SPG_NFT_CONTRACT_ADDRESS = "0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc";

// Story Client 생성 함수
export const createStoryClient = (wallet: any) => {
  if (!wallet) return null;
  
  console.log("Creating Story client with wallet:", {
    address: wallet.account?.address,
    chain: wallet.chain,
  });
  
  // 단일 지갑 통합 인터페이스 제공
  const integratedWallet = {
    ...wallet,
    writeContract: async (args: any) => {
      console.log("Attempting to write contract with args:", args);
      
      // 원본 wagmi의 writeContract 사용 시도
      if (typeof wallet.writeContract === 'function') {
        try {
          console.log("Using wagmi writeContract");
          return wallet.writeContract(args);
        } catch (wagmiError) {
          console.error("wagmi writeContract failed:", wagmiError);
          // wagmi 호출이 실패하면 직접 메타마스크 호출로 폴백
        }
      }
      
      // 직접 메타마스크 호출 시도
      // @ts-ignore - 타입 오류 무시
      const provider = window.ethereum;
      if (provider) {
        console.log("Falling back to window.ethereum provider");
        try {
          const params = [{
            from: wallet.account.address,
            to: args.address,
            data: args.data,
            gas: '0x186A0', // 100,000 gas
          }];
          
          // 메타마스크에 트랜잭션 요청
          const txHash = await provider.request({
            method: 'eth_sendTransaction',
            params
          });
          
          console.log("Transaction sent via MetaMask:", txHash);
          return txHash;
        } catch (ethError) {
          console.error("MetaMask transaction failed:", ethError);
          throw ethError;
        }
      }
      
      // 두 방법 모두 실패한 경우
      throw new Error("No suitable wallet method available for transaction");
    }
  };
  
  return StoryClient.newClient({
    wallet: integratedWallet as any,
    transport: custom(wallet.transport),
    chainId: "aeneid",
  });
}; 
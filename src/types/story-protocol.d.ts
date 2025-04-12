import { Abi, Account, Chain } from 'viem';

declare module '@story-protocol/core-sdk' {
  interface SimpleWalletClient<TChain extends Chain | undefined = Chain | undefined, TAccount extends Account | undefined = Account | undefined> {
    account?: TAccount;
    writeContract: any; // 복잡한 제네릭 타입 대신 any 사용
  }
} 
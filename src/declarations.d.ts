declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';

// Node.js 모듈 타입 선언
declare module 'path' {
  const path: any;
  export = path;
}

declare module 'os' {
  const os: any;
  export = os;
}

declare module 'crypto' {
  const crypto: any;
  export = crypto;
}

// Story Protocol SDK의 문제 있는 타입 선언을 위한 임시 해결책
declare module '@story-protocol/core-sdk/dist/declarations/src/abi/generated' {
  import { Account, Chain } from 'viem';
  
  export interface SimpleWalletClient<
    TChain extends Chain | undefined = Chain | undefined,
    TAccount extends Account | undefined = Account | undefined
  > {
    account?: TAccount;
    writeContract: any;
  }
}
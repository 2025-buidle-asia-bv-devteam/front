import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';

interface WalletContextType {
  account: string | null;
  chainId: number | null;
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
  error: string | null;
}

const WalletContext = createContext<WalletContextType>({
  account: null,
  chainId: null,
  provider: null,
  signer: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  isConnecting: false,
  error: null,
});

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      if (!window.ethereum) {
        throw new Error('메타마스크가 설치되어 있지 않습니다. 설치 후 다시 시도해 주세요.');
      }

      // 이더리움 공급자 설정
      const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(ethProvider);

      // 사용자 계정 요청
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length === 0) {
        throw new Error('지갑 연결이 거부되었습니다.');
      }

      // 계정 정보 설정
      const account = accounts[0];
      setAccount(account);

      // 체인 ID 요청
      const { chainId } = await ethProvider.getNetwork();
      setChainId(chainId);

      // 서명자 설정
      const signer = ethProvider.getSigner();
      setSigner(signer);

      // 로컬 스토리지에 연결 상태 저장
      localStorage.setItem('walletConnected', 'true');
    } catch (err: any) {
      console.error('지갑 연결 오류:', err);
      setError(err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setChainId(null);
    setProvider(null);
    setSigner(null);
    localStorage.removeItem('walletConnected');
  };

  // 계정 변경 이벤트 처리
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // 사용자가 모든 계정 연결을 해제
        disconnectWallet();
      } else {
        // 새 계정으로 변경
        setAccount(accounts[0]);
      }
    };

    const handleChainChanged = (chainIdHex: string) => {
      // 체인 ID는 16진수 문자열로 전달됨, 10진수로 변환
      setChainId(parseInt(chainIdHex, 16));
    };

    const handleDisconnect = () => {
      disconnectWallet();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    window.ethereum.on('disconnect', handleDisconnect);

    // 이전에 연결했던 경우 자동으로 연결 시도
    const checkConnection = async () => {
      if (localStorage.getItem('walletConnected') === 'true') {
        await connectWallet();
      }
    };
    
    checkConnection();

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('disconnect', handleDisconnect);
      }
    };
  }, []);

  return (
    <WalletContext.Provider
      value={{
        account,
        chainId,
        provider,
        signer,
        connectWallet,
        disconnectWallet,
        isConnecting,
        error,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// Window 객체에 ethereum 속성을 추가하기 위한 타입 선언 확장
declare global {
  interface Window {
    ethereum: any;
  }
} 
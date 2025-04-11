# 퍼퓸 AI - 웹3 향수 AI 에이전트 서비스

퍼퓸 AI는 블록체인 기술을 활용한 향수 AI 에이전트 서비스로, 사용자가 자신만의 향수를 찾고 NFT로 소유할 수 있는 플랫폼입니다.

## 주요 기능

- **AI 에이전트 대화**: AI 에이전트와 대화하여 사용자의 취향에 맞는 향수를 추천받을 수 있습니다.
- **향수 갤러리**: 다른 사용자가 생성한 향수들을 구경하고 구매할 수 있습니다.
- **Web3 연동**: 메타마스크 지갑 연결을 통해 블록체인 상에서 향수를 NFT로 소유하고 거래할 수 있습니다.
- **3D 시각화**: Three.js를 활용한 화려한 3D 시각 효과로 향수 병을 시각화합니다.

## 기술 스택

- **Frontend**: React, TypeScript, Styled-Components
- **3D 렌더링**: Three.js, React Three Fiber
- **Web3 연동**: Ethers.js
- **API 통신**: Axios

## 설치 및 실행 방법

### 필수 조건

- Node.js (v14 이상)
- npm 또는 yarn
- 메타마스크 지갑

### 설치

```bash
# 저장소 클론
git clone https://github.com/your-username/perfume-ai.git
cd perfume-ai

# 의존성 설치
npm install
# 또는
yarn install
```

### 개발 모드 실행

```bash
npm start
# 또는
yarn start
```

## 프로젝트 구조

```
src/
├── components/       # 재사용 가능한 컴포넌트
│   ├── common/       # 공통 컴포넌트
│   └── layout/       # 레이아웃 관련 컴포넌트
├── context/          # 컨텍스트 API
├── hooks/            # 커스텀 훅
├── pages/            # 페이지 컴포넌트
├── services/         # API 서비스
├── utils/            # 유틸리티 함수
└── assets/           # 이미지, 폰트 등 정적 파일
```

## 기여 방법

1. 이 저장소를 포크합니다.
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`).
3. 변경 사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`).
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`).
5. Pull Request를 생성합니다.

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 연락처

프로젝트 관리자 - [@twitter_handle](https://twitter.com/twitter_handle) - email@example.com

프로젝트 링크: [https://github.com/your-username/perfume-ai](https://github.com/your-username/perfume-ai) 
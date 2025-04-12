// 문제가 있는 모듈을 명시적으로 무시
declare module '@story-protocol/core-sdk/dist/declarations/src/abi/generated' {
  export * from '@story-protocol/core-sdk/dist/declarations/src/abi/patched';
} 
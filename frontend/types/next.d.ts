// Type declaration ensuring TypeScript resolves 'next' module exports cleanly
declare module 'next' {
  export * from 'next/dist/types';
  export { default } from 'next/dist/types';
}

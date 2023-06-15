declare global {
  export type Nullable<T> = T | null;
}

declare module '*.webp' {
  const value: string;
  export default value;
}
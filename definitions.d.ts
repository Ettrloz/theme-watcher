declare module '*.css' {}

declare module '*?inline' {
  const content: string;

  export { content as default };
}

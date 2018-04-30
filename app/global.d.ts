interface Map<T> {
    [s: string]: T;
}

declare module '*.scss' {
    export default {} as Map<string>;
}
declare module '*.css' {
    export default {} as any;
}
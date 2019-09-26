export * from './Updatable';

export interface Type<T> extends Function {
    new (...args: any[]): T;
}

export function getRandom<T>( a: T[]) : T {
    return a[Math.floor(Math.random() * a.length)];
}
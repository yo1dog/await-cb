export declare function awaitCb<T extends any[]>(fn: (cb: (...args: T) => any) => any): Promise<T>;
export declare function awaitErrCb<T extends any[]>(fn: (cb: (err: any, ...args: T) => any) => any): Promise<T>;

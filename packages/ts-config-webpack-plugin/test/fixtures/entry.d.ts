export interface IEntry<T> {
    key: string;
    value: T;
}
export declare class Entry<T> implements IEntry<T> {
    private $key;
    private $value;
    constructor($key: string, $value: T);
    readonly key: string;
    readonly value: any;
}
export declare const test: () => boolean;

export interface IEntry<T> {
	key: string;
	value: T;
}

export class Entry<T> implements IEntry<T> {
	constructor(private $key: string, private $value: T) {}

	get key(): string {
		return this.$key;
	}

	get value(): any {
		return this.$value;
	}
}

export const test = () => {
	const a = new Entry('a', 2);
	const b = new Entry('b', 4);
	const c = new Entry('b', 6);

	return [a, b, c].map((entry: Entry<number>) => entry.value * 2).every((value: number) => value > 0);
};

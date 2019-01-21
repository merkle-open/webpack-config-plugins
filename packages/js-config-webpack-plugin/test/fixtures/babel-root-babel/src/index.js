// classes
class Plugin {
	constructor(name) {
		this.name = name;
	}

	run() {
		console.log(`${name} is running!`);
	}
}

// arrow functions
const main = () => {
	const pluginOne = new Plugin('One');
	pluginOne.run();
};

main();

//map with pow
[1, 2, 3].map((number) => number ** 2);

// shorthand Object method
var obj = {
	shorthand,
	test() {
		return 'test';
	},
};

// spread
const arr = [1, 2, 3, 4, 5];
const spreadArr = [...arr];

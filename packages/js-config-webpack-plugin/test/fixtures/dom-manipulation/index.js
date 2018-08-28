import { createDivInsideElement } from './src/utils.js';

(() => {
	const container = document.querySelector('#container');
	createDivInsideElement(container);
	createDivInsideElement(container);
})();

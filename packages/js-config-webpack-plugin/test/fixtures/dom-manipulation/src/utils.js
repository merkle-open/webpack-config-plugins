const createDivInsideElement = (element) => {
	const _divElementNode = document.createElement('div');
	const _textElement = document.createTextNode('content');
	_divElementNode.appendChild(_textElement);
	element.appendChild(_divElementNode);
};

export { createDivInsideElement };

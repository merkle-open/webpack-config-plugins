// @ts-check
const { JSDOM } = require('jsdom');
const fs = require('fs');

/**
 * A small util to emulate a browser window.
 * @param {Partial<{js?: string[]| string, css?: string[]|string, html?: string}>} [options]
 * @returns {Promise<{ window: Window, document: Document, evalJsFile: (filePath: string) => void}>}
 *
 * Usage:
 * ```
  jsDomWindowContext({
    js: require.resolve('./frontend.js'),
    css: require.resolve('./styles.css'),
   }).then(({window, document} => {
     expect(document.titlte).toBe('Demo');
   }))
 * ```
 *
 */
function jsDomWindowContext(options = {}) {
	const jsFiles = options.js ? [].concat(options.js) : [];
	const cssFiles = options.css ? [].concat(options.css) : [];
	const html = options.html || '';
	function evalJsFile(dom, fileName) {
		const fileContents = fs.readFileSync(fileName, 'utf-8');
		dom.window.eval(fileContents);
	}
	return new Promise((resolve, reject) => {
		let dom;
		try {
			const styles = cssFiles
				.map((fileName) => {
					const fileContents = fs.readFileSync(fileName, 'utf-8');
					return `<style>${fileContents}</style>`;
				})
				.join('');
			dom = new JSDOM(`<html><head>${styles}</head><body>${html}</body></html>`, {
				runScripts: 'outside-only',
			});
			jsFiles.forEach((fileName) => {
				evalJsFile(dom, fileName);
			});
		} catch (e) {
			return reject(e);
		}

		dom.window.addEventListener('load', () =>
			process.nextTick(() =>
				resolve({
					window: dom.window,
					document: dom.window.document,
					evalJsFile: evalJsFile.bind(null, dom),
				})
			)
		);
	});
}

module.exports = jsDomWindowContext;

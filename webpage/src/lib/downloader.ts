export function lazyDownload(content: string, filename: string, mimeType: string) {
	const args = arguments;
	import('downloadjs' /* webpackChunkName: 'LazyDownloadJs' */).then((download) => {
		return download.default.apply(null, args);
	});
}

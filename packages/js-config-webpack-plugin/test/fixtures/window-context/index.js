import { getWindowInnerHeight, getWindowInnerWidth } from './src/utils';

((WindowManager) => {
	window.WindowManager = WindowManager || {};

	// store innerHeight into WindowManager
	WindowManager.getWindowInnerHeight = getWindowInnerHeight;
	WindowManager.getWindowInnerWidth = getWindowInnerWidth;
})(window.WindowManager || {});

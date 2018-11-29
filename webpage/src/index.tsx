import React from 'react';
import { render } from 'react-dom';
import { App } from './App';

render(<App />, document.getElementById('root'));

// Install service worker for offline caching
if (process.env.NODE_ENV === 'production') {
	require('offline-plugin/runtime').install();
}

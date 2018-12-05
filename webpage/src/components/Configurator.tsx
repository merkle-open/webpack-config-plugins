import React, { Suspense } from 'react';
import Grid from '@material-ui/core/Grid';
import { ConfiguratorStore } from './Configurator.Store';
import { ConfiguratorForm } from './ConfiguratorForm';
import { autorun } from 'mobx';
import { configOptionKeys } from '../../../cli/src/config-generator';

const LazyConfiguratorResult = React.lazy(() =>
	import('./ConfiguratorResult' /* webpackChunkName: 'ConfiguratorResult' */).then(({ ConfiguratorResult }) => ({
		default: ConfiguratorResult,
	}))
);

// Get initial state from LocalStorage
function getInitialState() {
	try {
		const initial = JSON.parse(localStorage.getItem('configOptions') || '{}');
		const result = {};
		configOptionKeys.forEach((key) => {
			result[key] = initial[key] === true;
		});
		return initial;
	} catch {
		return {};
	}
}

const configuratorStore = new ConfiguratorStore(getInitialState());

// Update LocalStorage on change
autorun(() => {
	const result = {};
	configOptionKeys.forEach((key) => {
		result[key] = configuratorStore[key];
	});
	try {
		localStorage.setItem('configOptions', JSON.stringify(result));
	} catch {}
});

export const Configurator = () => (
	<div style={{ width: '100%', display: 'flex' }}>
		<Grid container spacing={24}>
			<Grid item xs="auto" sm={3} />
			<Grid item xs={12} sm={9}>
				<ConfiguratorForm store={configuratorStore} />
			</Grid>
			<Grid item xs={12}>
				<Suspense fallback={''}>
					<LazyConfiguratorResult store={configuratorStore} />
				</Suspense>
			</Grid>
		</Grid>
	</div>
);

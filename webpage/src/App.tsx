import React, { Suspense } from 'react';
import { Header } from './components/Header';
import { Configurator } from './components/Configurator';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';

const LazyReadme = React.lazy(() =>
	import('./components/Readme' /* webpackChunkName: 'Readme' */).then(({ Readme }) => ({ default: Readme }))
);

export const App = () => (
	<React.Fragment>
		<Header />
		<ExpansionPanel>
			<ExpansionPanelSummary>
				<Typography>Readme</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<Suspense fallback={'Loading Readme'}>
					<LazyReadme />
				</Suspense>
			</ExpansionPanelDetails>
		</ExpansionPanel>
		<ExpansionPanel defaultExpanded>
			<ExpansionPanelSummary>
				<Typography>Configurator</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<Configurator />
			</ExpansionPanelDetails>
		</ExpansionPanel>
	</React.Fragment>
);

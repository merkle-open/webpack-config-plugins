import React from 'react';
import { ConfiguratorStore } from './Configurator.Store';
import { ConfigLoaderTypeOptions } from '../lib/config-generator';
import Checkbox from '@material-ui/core/Checkbox';
import { observer } from 'mobx-react';
import FormControlLabel from '@material-ui/core/FormControlLabel';

type FormProps = {
	store: ConfiguratorStore;
};

const configOptionLabels: { [fieldName in keyof ConfigLoaderTypeOptions]: string } = {
	useJs: 'Load ES6 (.js .jsx)',
	useTs: 'Load Typescript (.ts tsx)',
	useScss: 'Load Scss (.scss)',
	useCss: 'Load Css (.css)',
	useFonts: 'Load Fonts (.woff .woff2)',
	useImages: 'Load Images',
	useHtml: 'Use Html Plugin',
	useClean: 'Use Clean Plugin',
	useDevServer: 'webpack-dev-server',
	useCli: 'webpack-cli',
};

export const ConfiguratorForm = observer(({ store }: FormProps) => (
	<div>
		{Object.entries(configOptionLabels).map(([fieldName, label]) => (
			<FormControlLabel
				key={fieldName}
				style={{ width: '40%' }}
				control={
					<Checkbox checked={store[fieldName]} onChange={() => (store[fieldName] = !store[fieldName])} />
				}
				label={label}
			/>
		))}
	</div>
));

import { Grid } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { observer } from 'mobx-react';
import React from 'react';
import { configOptionLabels } from '../../../cli/src/config-generator';
import { ConfiguratorStore } from './Configurator.Store';

type FormProps = {
	store: ConfiguratorStore;
};

export const ConfiguratorForm = observer(({ store }: FormProps) => (
	<Grid container>
		{Object.keys(configOptionLabels).map((fieldName) => (
			<Grid item xs={12} sm={6} key={fieldName}>
				<FormControlLabel
					control={
						<Checkbox checked={store[fieldName]} onChange={() => (store[fieldName] = !store[fieldName])} />
					}
					label={configOptionLabels[fieldName]}
				/>
			</Grid>
		))}
	</Grid>
));

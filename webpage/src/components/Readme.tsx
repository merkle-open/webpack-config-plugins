import React from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import { withStyles, Theme } from '@material-ui/core';

const link = '[webpack-config-plugins Github](https://github.com/merkle-open/webpack-config-plugins)';
const readme = require('!!raw-loader!../../../README.md') + '\n\n' + link;

const styles = (theme: Theme) => ({
	root: {
		'& img': {
			maxWidth: '100%',
		},
		'& a': {
			color: theme.palette.primary.main,
		},
	},
});

export const Readme = withStyles(styles)((props: { classes: any }) => (
	<div className={props.classes.root}>
		<MarkdownRenderer markdown={readme} options={{ html: true }} />
	</div>
));

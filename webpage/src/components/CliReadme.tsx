import React from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import { withStyles, Theme } from '@material-ui/core';

const link = '[Fork on Github](https://github.com/merkle-open/webpack-config-plugins/tree/master/cli)';
const readme = require('!!raw-loader!../../../cli/README.md') + '\n\n' + link;

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

export const CliReadme = withStyles(styles)((props: { classes: any }) => (
	<div className={props.classes.root}>
		<MarkdownRenderer markdown={readme} options={{ html: true }} />
	</div>
));

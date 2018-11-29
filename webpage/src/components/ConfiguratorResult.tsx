import React from 'react';
import { ConfiguratorStore } from './Configurator.Store';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { observer } from 'mobx-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/light';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import theme from 'react-syntax-highlighter/dist/esm/styles/hljs/vs2015';
import { lazyDownload } from '../lib/downloader';

SyntaxHighlighter.registerLanguage('javascript', js);

type ResultProps = {
	store: ConfiguratorStore;
};
export const ConfiguratorResult = observer(({ store }: ResultProps) => (
	<React.Fragment>
		{store.generatedUserConfigurations.npmInstall && (
			<Card style={{ padding: 20 }}>
				<div
					style={{ background: theme.hljs.background, color: theme.hljs.color, padding: 5, marginBottom: 10 }}
				>
					<p style={{ fontFamily: 'monospace', margin: 0, paddingLeft: 20, textIndent: -20, width: 0 }}>
						<span style={{ whiteSpace: 'nowrap' }}>
							npm<span style={{ color: theme['hljs-keyword'].color }}> i </span>--save-dev
						</span>
						{store.generatedUserConfigurations.npmInstall.split(' ').map((packageName, i) => (
							<span key={packageName + i}>
								<span style={{ whiteSpace: 'nowrap', color: theme['hljs-meta-string'].color }}>
									{packageName}
								</span>{' '}
							</span>
						))}
					</p>
				</div>
				<CopyToClipboard text={`npm i --save-dev ${store.generatedUserConfigurations.npmInstall}`}>
					<Button variant="contained" color="primary">
						Copy to clipboard
					</Button>
				</CopyToClipboard>
			</Card>
		)}
		{store.generatedUserConfigurations.webpackConfig && (
			<Card style={{ padding: 20 }}>
				<div style={{ marginBottom: 10 }}>
					<SyntaxHighlighter language="javascript" style={theme}>
						{store.generatedUserConfigurations.webpackConfig}
					</SyntaxHighlighter>
				</div>
				<CopyToClipboard text={store.generatedUserConfigurations.webpackConfig}>
					<Button variant="contained" color="primary">
						Copy to clipboard
					</Button>
				</CopyToClipboard>
				<Button
					onClick={() =>
						lazyDownload(store.generatedUserConfigurations.webpackConfig, 'webpack.config.js', 'text/plain')
					}
				>
					Download
				</Button>
			</Card>
		)}
	</React.Fragment>
));
